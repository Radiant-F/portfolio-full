/**
 * Avoid circular dependencies.
 * Each sub-module only imports from its own dependencies (like @/api/apiSlice), never from the barrel index.ts.
 * The barrel only re-exports — it never contains logic.
 */

// Types

// API hooks
export {
  useGetAboutQuery,
  useUpdateAboutMutation,
} from "./services/aboutApiSlice";

// Reducer
export { default as aboutReducer } from "./services/aboutReducerSlice";

// Components
