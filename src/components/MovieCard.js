import React from "react";
import styled from "styled-components/native";
import { Card, Subheading, Caption } from "react-native-paper";

const CardContainer = styled(Card)`
  background-color: #fff;
`;

const CardCover = styled(Card.Cover)`
  background-color: #fff;
  padding: 10px;
`;

const Info = styled.View`
  padding: 0 10px 10px 10px;
`;

const BASE_URL = "https://image.tmdb.org/t/p/original";

const MovieCard = ({ movie = {} }) => {
  const { title, backdrop_path, overview } = movie;
  return (
    <CardContainer elevation={5}>
      <CardCover source={{ uri: `${BASE_URL}${backdrop_path}` }} />
      <Info>
        <Subheading>{title}</Subheading>
        <Caption numberOfLines={1} ellipsizeMode="tail">
          {overview}
        </Caption>
      </Info>
    </CardContainer>
  );
};

export default MovieCard;
