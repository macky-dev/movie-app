import { TMDB_API_KEY } from "@env";

const requests = {
  createRequestToken: `/authentication/token/new?api_key=${TMDB_API_KEY}`,
  createSessionWithLogin: `/authentication/token/validate_with_login?api_key=${TMDB_API_KEY}`,
  createSession: `/authentication/session/new?api_key=${TMDB_API_KEY}`,
  getAccountDetails: `/account?api_key=${TMDB_API_KEY}`,
  getTrendingMovies: `/trending/movie/day?api_key=${TMDB_API_KEY}`,
  getMovieWatchList: (accountId, sessionId) =>
    `/account/${accountId}/watchlist/movies?api_key=${TMDB_API_KEY}&language=en-US&session_id=${sessionId}&sort_by=created_at.asc&page=1`,
  getRatedMovies: (accountId, sessionId) =>
    `/account/${accountId}/rated/movies?api_key=${TMDB_API_KEY}&language=en-US&session_id=${sessionId}&sort_by=created_at.asc&page=1`,
  getMovieDetail: (movieId) =>
    `/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`,
  searchMovie: `/search/movie?api_key=${TMDB_API_KEY}&language=en-US&page=1&include_adult=false`,
  toggleWatchlist: (accountId, sessionId) =>
    `/account/${accountId}/watchlist?api_key=${TMDB_API_KEY}&session_id=${sessionId}`,
  rateMovie: (movieId, sessionId) =>
    `/movie/${movieId}/rating?api_key=${TMDB_API_KEY}&session_id=${sessionId}`,
  deleteRating: (movieId, sessionId) =>
    `/movie/${movieId}/rating?api_key=${TMDB_API_KEY}&session_id=${sessionId}`,
};

export default requests;
