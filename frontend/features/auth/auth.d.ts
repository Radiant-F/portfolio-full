export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
  };
};

export type LoginRequest = {
  username: string;
  passphrase: string;
};

export type AuthState = {
  username: string;
  passphrase: string;
  sessionStatus: "checking" | "authenticated" | "unauthenticated";
  credentials: {
    accessToken: string | null;
    refreshToken: string | null;
    user: { id: string; username: string } | null;
  };
};
