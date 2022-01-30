import React from "react";
import { View } from "react-native";

import styled from "styled-components";
import moment from "moment";
import { Rating } from "react-native-ratings";
import {
  Card,
  Title,
  Paragraph,
  Caption,
  Subheading,
} from "react-native-paper";

const BASE_URL = "https://image.tmdb.org/t/p/original";

const CardCover = styled(Card.Cover)`
  height: 500px;
  border: none;
  background-color: #fff;
  border-radius: 10px;
`;

const CardContentSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RatingText = styled(Subheading)`
  color: #f1c40f;
  font-weight: bold;
`;

const MovieDetailSection = ({ movieDetail }) => {
  const releaseDate = moment(new Date(movieDetail.release_date)).format(
    "MMMM DD, YYYY",
  );

  return (
    <Card elevation={0}>
      <CardCover
        source={{ uri: `${BASE_URL}${movieDetail.poster_path}` }}
        resizeMode="contain"
      />
      <Card.Content>
        <Title>{movieDetail.title}</Title>
        <View>
          <Caption>{`Genres: `}</Caption>
          <Subheading numberOfLines={2} style={{ flexShrink: 1 }}>
            {movieDetail.genresList.join()}
          </Subheading>
        </View>

        <CardContentSection>
          <View>
            <Caption>{`Release date: `}</Caption>
            <Subheading>{releaseDate}</Subheading>
          </View>
          <View>
            <Caption>{`User Score: `}</Caption>
            <RowContainer>
              <Rating
                readonly={true}
                imageSize={20}
                startingValue={movieDetail ? movieDetail.vote_average / 2 : 0}
              />
              <RatingText>{` ${movieDetail.vote_average}`}</RatingText>
            </RowContainer>
          </View>
        </CardContentSection>
        <Caption>{`Overview: `}</Caption>
        <Paragraph>{movieDetail.overview}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default MovieDetailSection;
