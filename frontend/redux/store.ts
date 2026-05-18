import { apiSlice } from "@/api/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import { aboutReducer } from "@/features/about";
import { authReducer } from "@/features/auth";
import { contactReducer } from "@/features/contact";
import { skillReducer } from "@/features/skill";
import { workReducer } from "@/features/work";
import { experienceReducer } from "@/features/experience";
import { tagReducer } from "@/features/tag";
import { appSettingsReducer } from "@/features/app-settings";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    about: aboutReducer,
    contact: contactReducer,
    skill: skillReducer,
    work: workReducer,
    experience: experienceReducer,
    tag: tagReducer,
    appSettings: appSettingsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
