/**
 * Avoid circular dependencies.
 * Each sub-module only imports from its own dependencies (like @/api/apiSlice), never from the barrel index.ts.
 * The barrel only re-exports — it never contains logic.
 */

// Types

// API hooks
export {
  useGetContactQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} from "./services/contactApiSlice";

// Reducer
export { default as contactReducer } from "./services/contactReducerSlice";

// Components
