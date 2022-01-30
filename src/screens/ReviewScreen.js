import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { selectMovie } from "../store/movieSlice";

import styled from "styled-components/native";
import { ReviewCard } from "../components";

const Container = styled.View`
  flex: 1;
`;

const ReviewList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 15,
    paddingTop: 10,
  },
})``;

const BottomSpacer = styled.View`
  margin-bottom: 50px;
`;

const ReviewScreen = () => {
  const {
    movieDetail: { reviews },
  } = useSelector(selectMovie);

  return (
    <Container>
      <ReviewList
        data={reviews}
        keyExtractor={(item) => `r-${item.id}`}
        renderItem={({ item }) => <ReviewCard reviewDetail={item} />}
        ListFooterComponent={<BottomSpacer />}
      />
    </Container>
  );
};

export default ReviewScreen;
