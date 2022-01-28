import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchMovie } from "../store/movieSlice";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

const SearchContainer = styled.View`
  padding: 15px;
`;

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const onSearch = () => {
    if (!searchQuery) {
      return;
    }
    dispatch(searchMovie(searchQuery));
  };

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search for a movie"
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={onSearch}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
      />
    </SearchContainer>
  );
};

export default Search;
