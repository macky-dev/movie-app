import React from "react";
import { useDispatch } from "react-redux";
import { toggleWatchlist } from "../store/movieSlice";

import { Button } from "react-native-paper";

const WatchlistButton = ({ movieDetail, disabled }) => {
  const dispatch = useDispatch();
  const { id, isOnWatchlist } = movieDetail;

  const handleWatchlist = () => {
    dispatch(toggleWatchlist({ movieId: id, watchlist: isOnWatchlist }));
  };

  return (
    <Button
      icon="bookmark"
      mode={isOnWatchlist ? "contained" : "outlined"}
      color={isOnWatchlist ? "red" : "black"}
      onPress={handleWatchlist}
      disabled={disabled}
    >
      {isOnWatchlist ? "Remove from watchlist" : "Add to watchlist"}
    </Button>
  );
};

export default WatchlistButton;
