import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storage } from "@/api/storage";
import type { AppSettingsState, ThemeMode } from "../app-settings";
import { DEFAULT_DESIGN, type DesignVariant } from "@/constants/theme";

const initialState: AppSettingsState = {
  theme: "system",
  language: null,
  design: DEFAULT_DESIGN,
};

const appSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload;
      storage.set("settings.theme", action.payload);
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
      storage.set("settings.language", action.payload);
    },
    setDesign(state, action: PayloadAction<DesignVariant>) {
      state.design = action.payload;
      storage.set("settings.design", action.payload);
    },
    restoreSettings(state, action: PayloadAction<Partial<AppSettingsState>>) {
      if (action.payload.theme) state.theme = action.payload.theme;
      if (action.payload.language) state.language = action.payload.language;
      if (action.payload.design) state.design = action.payload.design;
    },
  },
});

export const { setTheme, setLanguage, setDesign, restoreSettings } =
  appSettingsSlice.actions;
export const appSettingsReducer = appSettingsSlice.reducer;
