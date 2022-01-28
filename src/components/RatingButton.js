import React from "react";

import { Button } from "react-native-paper";

const RatingButton = ({ movieDetail, showDialog }) => {
  const { myRating } = movieDetail;

  return (
    <Button
      icon="star"
      mode={myRating ? "contained" : "outlined"}
      color={myRating ? "#f1c40f" : "black"}
      onPress={showDialog}
    >
      {myRating ? `Rated ${myRating.toFixed(1)}` : `Rate`}
    </Button>
  );
};

export default RatingButton;
