import React from "react";
import { ActivityIndicator } from "react-native-paper";
import styled from "styled-components/native";

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingIndicator = () => {
  return (
    <LoadingContainer>
      <ActivityIndicator animating={true} size="large" />
    </LoadingContainer>
  );
};

export default LoadingIndicator;
