/**
 * Avoid circular dependencies.
 * Each sub-module only imports from its own dependencies (like @/api/apiSlice), never from the barrel index.ts.
 * The barrel only re-exports — it never contains logic.
 */

// Types

// API hooks
export {
  useGetWorksQuery,
  useGetWorkQuery,
  useCreateWorkMutation,
  useUpdateWorkMutation,
  useDeleteWorkMutation,
  useCreateWorkLinkMutation,
  useUpdateWorkLinkMutation,
  useDeleteWorkLinkMutation,
  useCreateWorkScreenshotMutation,
  useDeleteWorkScreenshotMutation,
  useAttachWorkTagMutation,
  useDetachWorkTagMutation,
  useUpdateWorkTranslationMutation,
  useGetWorkScreenshotPreviewQuery,
} from "./services/workApiSlice";

// Reducer
export { default as workReducer } from "./services/workReducerSlice";

// Components
