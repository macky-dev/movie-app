import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTrendingMovies,
  getMovieWatchList,
  selectMovie,
} from "../store/movieSlice";
import styled from "styled-components/native";

import { Search, MovieList, MovieCard, LoadingIndicator } from "../components";

const Container = styled.View`
  flex: 1;
`;

const ItemContainer = styled.TouchableOpacity`
  margin-bottom: 10px;
`;

const BottomSpacer = styled.View`
  margin-bottom: 70px;
`;

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector(selectMovie);

  useEffect(() => {
    dispatch(getTrendingMovies());
  }, [dispatch]);

  return (
    <Container>
      <Search />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <MovieList
          data={movies}
          keyExtractor={(item) => `m-${item.id}`}
          renderItem={({ item }) => (
            <ItemContainer
              onPress={() =>
                navigation.navigate("MovieDetail", { movieId: item.id })
              }
            >
              <MovieCard movie={item} />
            </ItemContainer>
          )}
          ListFooterComponent={<BottomSpacer />}
        />
      )}
    </Container>
  );
};

export default HomeScreen;
