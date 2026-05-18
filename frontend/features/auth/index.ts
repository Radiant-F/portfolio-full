/**
 * Avoid circular dependencies.
 * Each sub-module only imports from its own dependencies (like @/api/apiSlice), never from the barrel index.ts.
 * The barrel only re-exports — it never contains logic.
 */

// Types

// API hooks
export {
  useSignInMutation,
  useSignOutMutation,
  useRefreshTokenMutation,
  useMeQuery,
} from "./services/authApiSlice";

// Reducer
export {
  default as authReducer,
  clearCredentials,
  setEmail,
  setPassword,
  setCredentials,
  setSessionStatus,
} from "./services/authReducerSlice";

// Components
