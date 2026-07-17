import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../auth";

const initialState: AuthState = {
  username: "",
  passphrase: "",
  sessionStatus: "checking",
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
      state.sessionStatus = "authenticated";
    },
    clearCredentials: (state) => {
      state.credentials = initialState.credentials;
      state.sessionStatus = "unauthenticated";
    },
    setSessionStatus: (
      state,
      action: PayloadAction<AuthState["sessionStatus"]>,
    ) => {
      state.sessionStatus = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassphrase: (state, action: PayloadAction<string>) => {
      state.passphrase = action.payload;
    },
  },
});

export const {
  clearCredentials,
  setCredentials,
  setSessionStatus,
  setUsername,
  setPassphrase,
} = authSlice.actions;

export default authSlice.reducer;
