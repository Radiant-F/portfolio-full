export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
  };
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthState = {
  email: string;
  password: string;
  credentials: {
    accessToken: string | null;
    refreshToken: string | null;
    user: { id: string; email: string } | null;
  };
};
