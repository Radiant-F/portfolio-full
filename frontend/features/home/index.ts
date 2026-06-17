/**
 * Avoid circular dependencies.
 * Each sub-module only imports from its own dependencies (like @/api/apiSlice), never from the barrel index.ts.
 * The barrel only re-exports — it never contains logic.
 */

// Types

// API hooks

// Reducer

// Components
export { default as WorkPreview } from "./components/WorkPreview";
export { default as Wave } from "./components/Wave";
export { default as HeroDescription } from "./components/HeroDescription";
export { default as ButtonSocial } from "./components/ButtonSocial";
export { default as LanguagePicker } from "./components/LanguagePicker";
export { default as HeaderHome } from "./components/Header";
export { default as DrawerContentHome } from "./components/DrawerContentHome";
