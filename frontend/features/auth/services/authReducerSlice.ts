import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../auth";

const initialState: AuthState = {
  email: "",
  password: "",
  credentials: {
    accessToken: null,
    refreshToken: null,
    user: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<AuthState["credentials"]>,
    ) => {
      state.credentials = action.payload;
    },
    clearCredentials: (state) => {
      state.credentials = initialState.credentials;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

export const { clearCredentials, setCredentials, setEmail, setPassword } =
  authSlice.actions;

export default authSlice.reducer;
