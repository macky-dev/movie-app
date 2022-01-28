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
      dispatch(loginUser({ username, password, request_token }));
    } catch (error) {
      return rejectWithValue("Request token error");
    }
  },
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (
    { username, password, request_token },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const loginResponse = await axios.post(requests.createSessionWithLogin, {
        username,
        password,
        request_token,
      });
      const { request_token: validated_token } = loginResponse.data;
      dispatch(createSession(validated_token));
    } catch (error) {
      return rejectWithValue("Invalid username or password");
    }
  },
);

export const createSession = createAsyncThunk(
  "user/createSession",
  async (validated_token, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(requests.createSession, {
        request_token: validated_token,
      });
      const { session_id } = response.data;
      dispatch(getAccountDetails(session_id));
    } catch (error) {
      return rejectWithValue("Create Session error");
    }
  },
);

export const getAccountDetails = createAsyncThunk(
  "user/getAccountDetails",
  async (session_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(requests.getAccountDetails, {
        params: {
          session_id,
        },
      });
      await AsyncStorage.setItem("@sessionId", JSON.stringify(session_id));
      await AsyncStorage.setItem("@userData", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue("Account Details error");
    }
  },
);

export const localSignin = createAsyncThunk("user/localSignin", async () => {
  const user = await AsyncStorage.getItem("@userData");
  const sessionId = await AsyncStorage.getItem("@sessionId");
  if (user && sessionId) {
    return { user: JSON.parse(user), sessionId: JSON.parse(sessionId) };
  }
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
  reducers: {
    signout: (state) => {
      // to remove item in async storage as well
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginRequest.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(loginRequest.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(createSession.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createSession.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createSession.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getAccountDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAccountDetails.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    });
    builder.addCase(getAccountDetails.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(localSignin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(localSignin.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.sessionId = action.payload.sessionId;
      state.isAuthenticated = true;
      state.loading = false;
    });
    builder.addCase(localSignin.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;
