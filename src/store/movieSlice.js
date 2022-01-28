import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";
import requests from "../api/request";

export const getTrendingMovies = createAsyncThunk(
  "movie/getTrendingMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(requests.getTrendingMovies);
      const movies = response.data.results;
      return movies;
    } catch (error) {
      return rejectWithValue("Error in fetching movie list");
    }
  },
);

export const getMovieWatchList = createAsyncThunk(
  "movie/getMovieWatchList",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user, sessionId } = getState().user;
      const response = await axios.get(
        requests.getMovieWatchList(user.id, sessionId),
      );
      const watchlist = response.data.results;
      return watchlist;
    } catch (error) {
      return rejectWithValue("Error in fetching watchlist");
    }
  },
);

export const getMovieDetails = createAsyncThunk(
  "movie/getMovieDetails",
  async (movieId, { getState, rejectWithValue }) => {
    try {
      const { user, sessionId } = getState().user;
      const watchlistResponse = await axios.get(
        requests.getMovieWatchList(user.id, sessionId),
      );
      const watchlist = watchlistResponse.data.results;

      const ratedMoviesResponse = await axios.get(
        requests.getRatedMovies(user.id, sessionId),
      );
      const ratedMovies = ratedMoviesResponse.data.results;

      const movieDetailResponse = await axios.get(
        requests.getMovieDetail(movieId),
      );
      const { id, genres } = movieDetailResponse.data;
      const genresList = genres.map((genre) => genre.name);

      const isOnWatchlist = watchlist.some((movie) => movie.id === id);

      const movieRated = ratedMovies.filter((movie) => movie.id === id);
      const myRating = movieRated.length > 0 ? movieRated[0].rating : null;

      return {
        ...movieDetailResponse.data,
        isOnWatchlist,
        myRating,
        genresList,
      };
    } catch (error) {
      return rejectWithValue("Error in fetching movie detail");
    }
  },
);

export const searchMovie = createAsyncThunk(
  "movie/searchMovie",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await axios.get(requests.searchMovie, {
        params: {
          query: searchQuery,
        },
      });
      const movies = response.data.results;
      return movies;
    } catch (error) {
      return rejectWithValue("Error in searching movie");
    }
  },
);

export const toggleWatchlist = createAsyncThunk(
  "movie/toggleWatchlist",
  async ({ movieId, watchlist }, { rejectWithValue, getState }) => {
    try {
      const { user, sessionId } = getState().user;
      const { movieDetail } = getState().movie;
      await axios.post(
        requests.toggleWatchlist(user.id, sessionId),
        {
          media_type: "movie",
          media_id: movieId,
          watchlist: !watchlist,
        },
        {
          headers: { "Content-Type": "application/json;charset=utf-8" },
        },
      );
      return { ...movieDetail, isOnWatchlist: !watchlist };
    } catch (error) {
      return rejectWithValue("Error in adding/removing watchlist");
    }
  },
);

const initialState = {
  movies: [],
  watchlist: [],
  movieDetail: null,
  loading: true,
  error: null,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTrendingMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTrendingMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.loading = false;
    });
    builder.addCase(getTrendingMovies.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getMovieWatchList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMovieWatchList.fulfilled, (state, action) => {
      state.watchlist = action.payload;
      state.loading = false;
    });
    builder.addCase(getMovieWatchList.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getMovieDetails.pending, (state) => {
      state.movieDetail = null;
    });
    builder.addCase(getMovieDetails.fulfilled, (state, action) => {
      state.movieDetail = action.payload;
    });
    builder.addCase(getMovieDetails.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(searchMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchMovie.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.loading = false;
    });
    builder.addCase(searchMovie.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(toggleWatchlist.fulfilled, (state, action) => {
      state.movieDetail = action.payload;
    });
    builder.addCase(toggleWatchlist.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const selectMovie = (state) => state.movie;

export default movieSlice.reducer;
