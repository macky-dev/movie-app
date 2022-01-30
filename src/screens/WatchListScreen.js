import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getMovieWatchList, selectMovie } from "../store/movieSlice";

import styled from "styled-components/native";
import { Title, Caption } from "react-native-paper";
import { MovieList, MovieCard, LoadingIndicator } from "../components";

const ItemContainer = styled.TouchableOpacity`
  margin-bottom: 10px;
`;

const HeaderContainer = styled.View`
  margin-bottom: 10px;
`;

const BottomSpacer = styled.View`
  margin-bottom: 70px;
`;

const NoDataContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const WatchListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { watchlist, loading } = useSelector(selectMovie);

  useFocusEffect(
    useCallback(() => {
      dispatch(getMovieWatchList());
    }, []),
  );

  const hasWatchlistItem = watchlist.length > 0;

  return loading ? (
    <LoadingIndicator />
  ) : hasWatchlistItem ? (
    <MovieList
      data={watchlist}
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
      ListHeaderComponent={
        <HeaderContainer>
          <Title>My Watchlist</Title>
        </HeaderContainer>
      }
      ListFooterComponent={<BottomSpacer />}
    />
  ) : (
    <NoDataContainer>
      <Caption>You haven't added any movies to your watchlist.</Caption>
    </NoDataContainer>
  );
};

export default WatchListScreen;
