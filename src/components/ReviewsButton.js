import React from "react";
import { useSelector } from "react-redux";
import { selectMovie } from "../store/movieSlice";

import { Button } from "react-native-paper";

const ReviewsButton = ({ showReviews, reviewsCount = 0 }) => {
  return (
    <Button
      icon="comment"
      mode={reviewsCount > 0 ? "contained" : "outlined"}
      onPress={showReviews}
      disabled={reviewsCount > 0 ? false : true}
    >
      {reviewsCount > 0 ? `Show Reviews (${reviewsCount})` : `No reviews yet`}
    </Button>
  );
};

export default ReviewsButton;
