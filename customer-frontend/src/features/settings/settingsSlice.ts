import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getSettings,
} from "../../api/homeApi";

export const fetchSettings =
createAsyncThunk(
  "settings/fetch",
  async () => {

    const res =
    await getSettings();

    return res.data.data;

  }
);

const settingsSlice =
createSlice({

  name: "settings",

  initialState: {

    data: null,

    loading: false,

  },

  reducers: {},

  extraReducers:
  (builder)=>{

    builder

    .addCase(
      fetchSettings.pending,
      (state)=>{

        state.loading =
        true;

      }
    )

    .addCase(
      fetchSettings.fulfilled,
      (
        state,
        action
      )=>{

        state.loading =
        false;

        state.data =
        action.payload;

      }
    );

  },

});

export default
settingsSlice.reducer;