import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovieDetails,
  rateMovie,
  deleteRating,
  selectMovie,
} from "../store/movieSlice";

import styled from "styled-components/native";
import { Rating } from "react-native-ratings";
import { Dialog, Portal, Provider, Button } from "react-native-paper";
import {
  MovieDetailSection,
  WatchlistButton,
  RatingButton,
  LoadingIndicator,
  ReviewsButton,
} from "../components";

const Container = styled.ScrollView`
  flex: 1;
  padding: 0 10px;
`;

const ButtonContainer = styled.View`
  padding: 10px;
`;

const BottomSpacer = styled.View`
  margin-bottom: 50px;
`;

const MovieDetailScreen = ({ route, navigation }) => {
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const { movieDetail, loading } = useSelector(selectMovie);
  const dispatch = useDispatch();
  const { movieId } = route.params;

  useEffect(() => {
    dispatch(getMovieDetails(movieId));
  }, [dispatch, movieId]);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const handleSaveRating = () => {
    if (rating !== 0) {
      dispatch(rateMovie({ movieId, rating }));
    }
    hideDialog();
  };

  const handleDeleteRating = () => {
    dispatch(deleteRating(movieId));
    hideDialog();
  };

  const showReviews = () => navigation.navigate("MovieReviews");

  return movieDetail ? (
    <Provider>
      <Portal>
        <Container>
          <MovieDetailSection movieDetail={movieDetail} />
          {/* Rating button */}
          <ButtonContainer>
            <RatingButton
              movieDetail={movieDetail}
              showDialog={showDialog}
              disabled={loading}
            />
          </ButtonContainer>

          {/* Watchlist Button */}
          <ButtonContainer>
            <WatchlistButton movieDetail={movieDetail} disabled={loading} />
          </ButtonContainer>

          {/* Rating dialog */}
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Rate movie</Dialog.Title>
            <Dialog.Content>
              <Rating
                imageSize={25}
                startingValue={movieDetail.myRating || 0}
                showRating={true}
                jumpValue={0.5}
                fractions={1}
                ratingCount={10}
                onFinishRating={setRating}
              />
            </Dialog.Content>
            <Dialog.Actions>
              {movieDetail.myRating ? (
                <Button onPress={handleDeleteRating}>Delete Rating</Button>
              ) : (
                <Button onPress={hideDialog}>Cancel</Button>
              )}
              <Button onPress={handleSaveRating}>Save</Button>
            </Dialog.Actions>
          </Dialog>

          {/* Reviews section */}
          <ButtonContainer>
            <ReviewsButton
              showReviews={showReviews}
              reviewsCount={movieDetail.reviews?.length}
            />
          </ButtonContainer>

          <BottomSpacer />
        </Container>
      </Portal>
    </Provider>
  ) : (
    <LoadingIndicator />
  );
};

export default MovieDetailScreen;
