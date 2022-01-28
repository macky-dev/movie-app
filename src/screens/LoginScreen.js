import React, { useState, useEffect } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, selectUser } from "../store/userSlice";
import styled from "styled-components/native";
import { TextInput, Button } from "react-native-paper";

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #fff;
`;

const InnerContainer = styled.View`
  flex: 1;
  padding: 20px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.View`
  width: 300px;
`;

const Spacer = styled.View`
  margin-top: 20px;
`;

const Image = styled.Image`
  height: 200px;
  width: 200px;
  margin-bottom: 20px;
`;

const ErrorContainer = styled.View`
  max-width: 300px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ErrorText = styled.Text`
  color: #d0421b;
  font-size: 16px;
`;

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      navigation.replace("Main");
    }
  }, [user]);

  const handleUserLogin = () => {
    if (!username && !password) {
      return;
    }
    dispatch(loginRequest({ username, password }));
  };

  return (
    <Container
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <InnerContainer>
          <Image source={require("../../assets/images/movies-icon.png")} />
          <InputContainer>
            <TextInput
              label="Username"
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              textContentType="username"
              autoCapitalize="none"
            />
            <Spacer />
            <TextInput
              label="Password"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="password"
              autoCapitalize="none"
            />
            {error && (
              <ErrorContainer>
                <ErrorText>{error}</ErrorText>
              </ErrorContainer>
            )}
            <Spacer />

            <Button
              mode="contained"
              onPress={() => handleUserLogin()}
              loading={loading}
            >
              Login
            </Button>
          </InputContainer>
        </InnerContainer>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default LoginScreen;
