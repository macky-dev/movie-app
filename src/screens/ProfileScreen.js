import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout } from "../store/userSlice";

import styled from "styled-components/native";
import { Title, Avatar, Subheading, Button } from "react-native-paper";

const BASE_URL = "https://image.tmdb.org/t/p/original";

const Container = styled.View`
  padding-left: 10px;
  padding-right: 10px;
  flex: 1;
`;

const UserDetailContainer = styled.View`
  flex: 0.5;
  align-items: center;
  justify-content: center;
`;

const NameContainer = styled.View`
  margin-top: 20px;
  align-items: center;
`;

const ActionContainer = styled.View`
  flex: 0.5;
  padding: 20px;
  justify-content: flex-end;
`;

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const {
    avatar: { tmdb },
    username,
    name,
  } = user;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <UserDetailContainer>
        {tmdb.avatar_path ? (
          <Avatar.Image
            size={150}
            source={{ uri: `${BASE_URL}${tmdb.avatar_path}` }}
          />
        ) : (
          <Avatar.Icon size={150} icon="human" />
        )}
        <NameContainer>
          <Title>{username}</Title>
          <Subheading>{name}</Subheading>
        </NameContainer>
      </UserDetailContainer>
      <ActionContainer>
        <Button icon="logout" mode="contained" onPress={handleLogout}>
          Logout
        </Button>
      </ActionContainer>
    </Container>
  );
};

export default ProfileScreen;
