import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storage } from "@/api/storage";

export type PublicThemeMode = "light" | "dark" | "system";

export type PublicThemeState = {
  mode: PublicThemeMode;
  accentColor: string | null;
};

const STORAGE_MODE_KEY = "public.theme.mode";
const STORAGE_ACCENT_KEY = "public.theme.accent";

const initialState: PublicThemeState = {
  mode: "dark",
  accentColor: null,
};

const publicThemeSlice = createSlice({
  name: "publicTheme",
  initialState,
  reducers: {
    setPublicThemeMode(state, action: PayloadAction<PublicThemeMode>) {
      state.mode = action.payload;
      storage.set(STORAGE_MODE_KEY, action.payload);
    },
    setPublicThemeAccentColor(state, action: PayloadAction<string | null>) {
      state.accentColor = action.payload;

      if (action.payload) {
        storage.set(STORAGE_ACCENT_KEY, action.payload);
        return;
      }

      storage.set(STORAGE_ACCENT_KEY, "");
    },
    restorePublicTheme(
      state,
      action: PayloadAction<Partial<PublicThemeState>>,
    ) {
      if (action.payload.mode) {
        state.mode = action.payload.mode;
      }

      if (action.payload.accentColor !== undefined) {
        state.accentColor = action.payload.accentColor;
      }
    },
  },
});

export const PUBLIC_THEME_STORAGE_KEYS = {
  mode: STORAGE_MODE_KEY,
  accent: STORAGE_ACCENT_KEY,
} as const;

export const {
  setPublicThemeMode,
  setPublicThemeAccentColor,
  restorePublicTheme,
} = publicThemeSlice.actions;
export const publicThemeReducer = publicThemeSlice.reducer;
