import { apiSlice } from "@/api/apiSlice";
import { LoginRequest, LoginResponse } from "../auth";
import { clearCredentials, setCredentials } from "./authReducerSlice";
import { router } from "expo-router";
import {
  buildRefreshRequest,
  clearStoredSession,
  persistSession,
  toAuthCredentials,
} from "./session";

const authReducerSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    signIn: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (_args, api) => {
        try {
          const { data } = await api.queryFulfilled;

          persistSession(data);
          api.dispatch(setCredentials(toAuthCredentials(data)));
          router.replace("/(app)");
        } catch (error) {}
      },
    }),
    signOut: build.mutation<{ message: string }, null>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      onQueryStarted: async (_args, api) => {
        try {
          await api.queryFulfilled;
        } catch (error) {
        } finally {
          clearStoredSession();
          api.dispatch(clearCredentials());
          router.replace("/sign-in");
        }
      },
    }),
    refreshToken: build.mutation<LoginResponse, null>({
      query: () => buildRefreshRequest(),
      onQueryStarted: async (_args, api) => {
        try {
          const { data } = await api.queryFulfilled;

          persistSession(data);
          api.dispatch(setCredentials(toAuthCredentials(data)));
        } catch (error) {
          clearStoredSession();
          api.dispatch(clearCredentials());
        }
      },
    }),
    me: build.query<{ id: string; username: string }, null>({
      query: () => "/auth/me",
    }),
  }),
});

export const {
  useSignInMutation,
  useSignOutMutation,
  useRefreshTokenMutation,
  useMeQuery,
} = authReducerSlice;
