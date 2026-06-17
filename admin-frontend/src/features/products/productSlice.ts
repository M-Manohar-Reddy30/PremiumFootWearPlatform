import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productThunks";
import type {
  Product,
  Pagination,
} from "./productTypes";

interface ProductState {
  products: Product[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  pagination: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchProducts.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
            fetchProducts.fulfilled,
            (state, action) => {
                state.loading = false;

                state.products =
                action.payload.products || [];

                state.pagination =
                action.payload.pagination;
            }
        )

      .addCase(
        fetchProducts.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.error.message ||
            "Failed";
        }
      );
  },
});

export default productSlice.reducer;