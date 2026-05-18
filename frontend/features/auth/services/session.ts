import type { FetchArgs } from "@reduxjs/toolkit/query/react";
import { Platform } from "react-native";
import { storage } from "@/api/storage";
import type { AuthState, LoginResponse } from "../auth";

const isWebPlatform = Platform.OS === "web";

export function clearStoredSession() {
  storage.remove("token.access");
  storage.remove("token.refresh");
}

export function persistSession(response: LoginResponse) {
  if (isWebPlatform) {
    clearStoredSession();
    return;
  }

  storage.set("token.access", response.accessToken);
  storage.set("token.refresh", response.refreshToken);
}

export function toAuthCredentials(
  response: LoginResponse,
): AuthState["credentials"] {
  return {
    accessToken: isWebPlatform ? null : response.accessToken,
    refreshToken: isWebPlatform ? null : response.refreshToken,
    user: response.user,
  };
}

export function getStoredRefreshToken() {
  if (isWebPlatform) return null;

  return storage.getString("token.refresh") ?? null;
}

export function hasRestorableSession() {
  return isWebPlatform || !!getStoredRefreshToken();
}

export function buildRefreshRequest(): FetchArgs {
  const refreshToken = getStoredRefreshToken();

  return {
    url: "/auth/refresh",
    method: "POST",
    body: refreshToken ? { refreshToken } : {},
  };
}
