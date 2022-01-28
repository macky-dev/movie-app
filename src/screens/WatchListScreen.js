import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getMovieWatchList, selectMovie } from "../store/movieSlice";
import styled from "styled-components/native";

import { View } from "react-native";
import { Title } from "react-native-paper";
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

const WatchListScreen = () => {
  const dispatch = useDispatch();
  const { watchlist, loading } = useSelector(selectMovie);

  useFocusEffect(
    useCallback(() => {
      dispatch(getMovieWatchList());
    }, []),
  );

  return loading ? (
    <LoadingIndicator />
  ) : (
    <View>
      <MovieList
        data={watchlist}
        keyExtractor={(item) => `m-${item.id}`}
        renderItem={({ item }) => (
          <ItemContainer>
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
    </View>
  );
};

export default WatchListScreen;
