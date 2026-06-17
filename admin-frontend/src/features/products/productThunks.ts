import {
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getProducts,
} from "../../api/productApi";

export const fetchProducts =
  createAsyncThunk(
    "products/fetchProducts",

    async (params?: any) => {
      const res =
        await getProducts(params);

      return res.data;
    }
  );