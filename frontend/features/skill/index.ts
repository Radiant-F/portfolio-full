/**
 * Avoid circular dependencies.
 * Each sub-module only imports from its own dependencies (like @/api/apiSlice), never from the barrel index.ts.
 * The barrel only re-exports — it never contains logic.
 */

// Types

// API hooks
export {
  useGetSkillsQuery,
  useGetSkillQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
  useCreateSkillDetailMutation,
  useUpdateSkillDetailMutation,
  useDeleteSkillDetailMutation,
  useUpdateSkillDetailTranslationMutation,
} from "./services/skillApiSlice";

// Reducer
export { default as skillReducer } from "./services/skillReducerSlice";

// Components
