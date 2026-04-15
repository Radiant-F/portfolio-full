import { createSlice } from "@reduxjs/toolkit";

export const aboutSlice = createSlice({
  name: "about",
  initialState: {
    content_string: "",
  },
  reducers: {},
});

export const {} = aboutSlice.actions;

export default aboutSlice.reducer;
