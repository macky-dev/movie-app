import styled from "styled-components/native";
import { FlatList } from "react-native";

const MovieList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 15,
    paddingTop: 0,
  },
})``;

export default MovieList;
