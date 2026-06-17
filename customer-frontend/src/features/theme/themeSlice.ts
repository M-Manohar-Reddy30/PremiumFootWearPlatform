import { createSlice } from "@reduxjs/toolkit";

const savedTheme =
localStorage.getItem("theme");

const themeSlice =
createSlice({

  name:"theme",

  initialState:{
    darkMode:
      savedTheme === "dark",
  },

  reducers:{

    toggleTheme:
    (state)=>{

      state.darkMode =
      !state.darkMode;

      localStorage.setItem(
        "theme",
        state.darkMode
          ? "dark"
          : "light"
      );

    },

  },

});

export const {
  toggleTheme
} =
themeSlice.actions;

export default
themeSlice.reducer;