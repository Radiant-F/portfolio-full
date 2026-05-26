import type { LoginResponse } from "@/features/auth/auth";
import {
  clearCredentials,
  setCredentials,
} from "@/features/auth/services/authReducerSlice";
import {
  buildRefreshRequest,
  clearStoredSession,
  hasRestorableSession,
  persistSession,
  toAuthCredentials,
} from "@/features/auth/services/session";
import { RootState } from "@/redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Platform } from "react-native";

let refreshRequest: Promise<boolean> | null = null;

const defaultApiBaseUrl =
  Platform.OS === "web" && typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:3000`
    : "http://192.168.20.72:3000";

const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL || defaultApiBaseUrl;

function getRequestUrl(args: string | FetchArgs) {
  return typeof args === "string" ? args : args.url;
}

function isReauthExcludedRequest(args: string | FetchArgs) {
  const url = getRequestUrl(args);

  return ["/auth/login", "/auth/logout", "/auth/refresh"].some((path) =>
    url.startsWith(path),
  );
}

const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  credentials: Platform.OS === "web" ? "include" : "omit",
  prepareHeaders: (headers, api) => {
    const accessToken = (api.getState() as RootState).auth.credentials
      .accessToken;

    // Web platform uses cookie but mobile isn't
    if (accessToken && Platform.OS !== "web")
      headers.set("Authorization", `Bearer ${accessToken}`);

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extra) => {
  async function refreshSession() {
    if (!refreshRequest) {
      refreshRequest = (async () => {
        const refreshResult = await baseQuery(
          buildRefreshRequest(),
          api,
          extra,
        );

        if (!refreshResult.data) {
          clearStoredSession();
          api.dispatch(clearCredentials());
          return false;
        }

        const data = refreshResult.data as LoginResponse;

        persistSession(data);
        api.dispatch(setCredentials(toAuthCredentials(data)));
        return true;
      })().finally(() => {
        refreshRequest = null;
      });
    }

    return refreshRequest;
  }

  let result = await baseQuery(args, api, extra);

  if (
    result.error?.status === 401 &&
    !isReauthExcludedRequest(args) &&
    hasRestorableSession()
  ) {
    const didRefresh = await refreshSession();

    if (!didRefresh) return result;

    result = await baseQuery(args, api, extra);
  }

  if (result.error?.status === 401 && !isReauthExcludedRequest(args)) {
    clearStoredSession();
    api.dispatch(clearCredentials());
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["About", "Contacts", "Skills", "Experiences", "Tags", "Works"],
});
