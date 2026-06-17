import {
  configureStore,
} from "@reduxjs/toolkit";

import themeReducer
from "../features/theme/themeSlice";

import homeReducer
from "../features/home/homeSlice";

import settingsReducer
from "../features/settings/settingsSlice";

export const store =
  configureStore({

    reducer: {

      theme:
      themeReducer,

       home:
       homeReducer,

       settings:
       settingsReducer,

    },

  });

export type RootState =
ReturnType<
typeof store.getState
>;

export type AppDispatch =
typeof store.dispatch;