import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { localSignin, selectUser } from "../store/userSlice";

import AppNavigator from "./AppNavigator";
import AccountNavigator from "./AccountNavigator";

const Navigation = () => {
  const { isAuthenticated } = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(localSignin());
  }, []);

  return (
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
