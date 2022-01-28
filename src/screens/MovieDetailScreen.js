import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetails, selectMovie } from "../store/movieSlice";

import styled from "styled-components";
import { Rating } from "react-native-ratings";
import {
  Dialog,
  Portal,
  Provider,
  Paragraph,
  Button,
} from "react-native-paper";
import {
  MovieDetailSection,
  WatchlistButton,
  RatingButton,
} from "../components";

const Container = styled.ScrollView`
  flex: 1;
  padding: 0 10px;
`;

const ButtonContainer = styled.View`
  padding: 10px;
`;

const MovieDetailScreen = ({ route }) => {
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const { movieDetail } = useSelector(selectMovie);
  const dispatch = useDispatch();
  const { movieId } = route.params;

  useEffect(() => {
    dispatch(getMovieDetails(movieId));
  }, [dispatch, movieId]);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  console.log("render detail", rating);

  return movieDetail ? (
    <Provider>
      <Portal>
        <Container>
          <MovieDetailSection movieDetail={movieDetail} />
          {/* Rating button */}
          <ButtonContainer>
            <RatingButton movieDetail={movieDetail} showDialog={showDialog} />
          </ButtonContainer>

          {/* Watchlist Button */}
          <ButtonContainer>
            <WatchlistButton movieDetail={movieDetail} />
          </ButtonContainer>

          {/* Reviews section */}

          {/* Rating dialog */}
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Rate movie</Dialog.Title>
            <Dialog.Content>
              <Rating
                imageSize={30}
                startingValue={movieDetail.myRating || 0}
                showRating={true}
                jumpValue={0.1}
                fractions={1}
                ratingCount={10}
                onFinishRating={setRating}
              />
            </Dialog.Content>
            <Dialog.Actions>
              {movieDetail.myRating ? (
                <Button onPress={hideDialog}>Delete Rating</Button>
              ) : (
                <Button onPress={hideDialog}>Cancel</Button>
              )}
              <Button onPress={hideDialog}>Save</Button>
            </Dialog.Actions>
          </Dialog>
        </Container>
      </Portal>
    </Provider>
  ) : null;
};

export default MovieDetailScreen;
