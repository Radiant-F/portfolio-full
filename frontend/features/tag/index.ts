/**
 * Avoid circular dependencies.
 * Each sub-module only imports from its own dependencies (like @/api/apiSlice), never from the barrel index.ts.
 * The barrel only re-exports — it never contains logic.
 */

// Types

// API hooks
export {
  useGetTagsQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
} from "./services/tagApiSlice";

// Reducer
export { default as tagReducer } from "./services/tagReducerSlice";

// Components
