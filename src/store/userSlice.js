import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../api/axios";
import requests from "../api/request";

export const loginRequest = createAsyncThunk(
  "user/loginRequest",
  async ({ username, password }, { dispatch, rejectWithValue }) => {
    try {
      const tokenResponse = await axios.get(requests.createRequestToken);
      const { request_token } = tokenResponse.data;
      //login w/ user & pass
      const loginResponse = await axios.post(requests.createSessionWithLogin, {
        username,
        password,
        request_token,
      });
      const { request_token: validated_token } = loginResponse.data;
      //create session
      const sessionResponse = await axios.post(requests.createSession, {
        request_token: validated_token,
      });
      const { session_id } = sessionResponse.data;
      //get account
      const accountResponse = await axios.get(requests.getAccountDetails, {
        params: {
          session_id,
        },
      });
      //store session and user data locally
      await AsyncStorage.setItem("@sessionId", JSON.stringify(session_id));
      await AsyncStorage.setItem(
        "@userData",
        JSON.stringify(accountResponse.data),
      );
      return { user: accountResponse.data, sessionId: session_id };
    } catch (error) {
      return rejectWithValue("Invalid username or password");
    }
  },
);

export const localSignin = createAsyncThunk("user/localSignin", async () => {
  const user = await AsyncStorage.getItem("@userData");
  const sessionId = await AsyncStorage.getItem("@sessionId");
  if (user && sessionId) {
    return {
      user: JSON.parse(user),
      sessionId: JSON.parse(sessionId),
      isAuthenticated: true,
    };
  }
  return { user: null, sessionId: null, isAuthenticated: false };
});

export const logout = createAsyncThunk("user/logout", async () => {
  await AsyncStorage.removeItem("@userData");
  await AsyncStorage.removeItem("@sessionId");
  return { user: null, sessionId: null, isAuthenticated: false };
});

const initialState = {
  user: null,
  sessionId: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginRequest.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.sessionId = payload.sessionId;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginRequest.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(localSignin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(localSignin.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.sessionId = payload.sessionId;
      state.isAuthenticated = payload.isAuthenticated;
      state.loading = false;
    });
    builder.addCase(localSignin.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.sessionId = payload.sessionId;
      state.isAuthenticated = payload.isAuthenticated;
      state.loading = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;
