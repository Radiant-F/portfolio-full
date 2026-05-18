/**
 * Avoid circular dependencies.
 * Each sub-module only imports from its own dependencies (like @/api/apiSlice), never from the barrel index.ts.
 * The barrel only re-exports — it never contains logic.
 */

// API hooks
export {
  appSettingsReducer,
  setTheme,
  setLanguage,
  setDesign,
  restoreSettings,
} from "./services/appSettingsSlice";

// Types
export type { AppSettingsState, ThemeMode } from "./app-settings";

// Components
export { default as Design } from "./components/Design";
export { default as Theme } from "./components/Theme";
export { default as Language } from "./components/Language";
