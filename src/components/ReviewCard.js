import React from "react";

import styled from "styled-components/native";
import moment from "moment";
import { Card, Title, Caption, Paragraph } from "react-native-paper";
import ReadMore from "react-native-read-more-text";

const CardContainer = styled(Card)`
  background-color: #fff;
  margin-bottom: 20px;
`;

const ReadMoreText = styled.Text`
  color: #35c;
  margin-top: 5px;
`;

const CaptionText = styled(Caption)`
  margin-bottom: 20px;
`;

const ReviewCard = ({ reviewDetail }) => {
  const { author, content, created_at } = reviewDetail;

  const createdAt = moment(new Date(created_at)).format("MMMM DD, YYYY");

  const renderTruncatedFooter = (handlePress) => {
    return <ReadMoreText onPress={handlePress}>Read more</ReadMoreText>;
  };

  const renderRevealedFooter = (handlePress) => {
    return <ReadMoreText onPress={handlePress}>Show less</ReadMoreText>;
  };

  return (
    <CardContainer elevation={5}>
      <Card.Content>
        <Title>{`A review by ${author}`}</Title>
        <CaptionText>{`Written by ${author} on ${createdAt}`}</CaptionText>
        <ReadMore
          numberOfLines={5}
          renderTruncatedFooter={renderTruncatedFooter}
          renderRevealedFooter={renderRevealedFooter}
        >
          <Paragraph>{content}</Paragraph>
        </ReadMore>
      </Card.Content>
    </CardContainer>
  );
};

export default ReviewCard;
