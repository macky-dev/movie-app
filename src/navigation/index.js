import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { localSignin, selectUser } from "../store/userSlice";

import AppNavigator from "./AppNavigator";
import AccountNavigator from "./AccountNavigator";
import { LoadingIndicator } from "../components";

const Navigation = () => {
  const { loading, isAuthenticated } = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(localSignin());
  }, []);

  return loading ? (
    <LoadingIndicator />
  ) : (
    <NavigationContainer
      theme={{
        colors: {
          background: "#fff",
        },
      }}
    >
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
