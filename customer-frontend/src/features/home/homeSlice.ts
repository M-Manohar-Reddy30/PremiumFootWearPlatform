import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getActiveBanners,
  getCategories,
  getFeaturedProducts,
  getTrendingProducts,
  getNewArrivalProducts,
  getSettings,
} from "../../api/homeApi";

export const fetchHomeData =
createAsyncThunk(
  "home/fetchHomeData",
  async () => {

    const [
      banners,
      categories,
      featured,
      trending,
      arrivals,
      settings,
    ] =
    await Promise.all([

      getActiveBanners(),

      getCategories(),

      getFeaturedProducts(),

      getTrendingProducts(),

      getNewArrivalProducts(),

      getSettings(),

    ]);

    return {

      banners:
      banners.data.data,

      categories:
      categories.data.data,

      featured:
      featured.data.products,

      trending:
      trending.data.products,

      arrivals:
      arrivals.data.products,

      settings:
      settings.data.data,

    };

  }
);

const homeSlice =
createSlice({

  name: "home",

  initialState: {

    banners: [],

    categories: [],

    featured: [],

    trending: [],

    arrivals: [],

    settings: null,

    loading: false,

  },

  reducers: {},

  extraReducers:
  (builder) => {

    builder

    .addCase(
      fetchHomeData.pending,
      (state) => {

        state.loading =
        true;

      }
    )

    .addCase(
      fetchHomeData.fulfilled,
      (
        state,
        action
      ) => {

        state.loading =
        false;

        state.banners =
        action.payload.banners;

        state.categories =
        action.payload.categories;

        state.featured =
        action.payload.featured;

        state.trending =
        action.payload.trending;

        state.arrivals =
        action.payload.arrivals;

        state.settings =
        action.payload.settings;

      }
    );

  },

});

export default
homeSlice.reducer;