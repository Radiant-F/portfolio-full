import { apiSlice } from "@/api/apiSlice";
import { LoginRequest, LoginResponse } from "../auth";
import { clearCredentials, setCredentials } from "./authReducerSlice";
import { router } from "expo-router";
import { storage } from "@/api/storage";

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

          storage.set("token.access", data.accessToken);
          storage.set("token.refresh", data.refreshToken);

          api.dispatch(setCredentials(data));
          router.replace("/(app)");
        } catch (error) {
          console.log("ERROR LOGIN:", error);
        }
      },
    }),
    signOut: build.mutation<{ message: string }, null>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      onQueryStarted: async (_args, api) => {
        try {
          await api.queryFulfilled;

          storage.remove("token.access");
          storage.remove("token.refresh");

          api.dispatch(clearCredentials());
        } catch (error) {
          console.log("ERROR LOGOUT:", error);
        }
      },
    }),
    refreshToken: build.mutation<LoginResponse, null>({
      query: () => ({ url: "/auth/refresh", method: "POST" }),
    }),
    me: build.query<{ id: string; email: string }, null>({
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
