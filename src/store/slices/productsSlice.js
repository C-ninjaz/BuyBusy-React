// productsSlice.js
// Redux slice for managing product state, including async thunks for Firestore operations and memoized selectors.

import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

// Entity adapter for normalized product state
const productsAdapter = createEntityAdapter();

/**
 * Async thunk to fetch all products from Firestore.
 */
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

/**
 * Products slice state and reducers.
 */
const productsSlice = createSlice({
  name: "products",
  initialState: productsAdapter.getInitialState({
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Error message if any
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        productsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

/**
 * Memoized selectors for products using EntityAdapter.
 */
export const productsSelectors = productsAdapter.getSelectors(
  (state) => state.products
);

/**
 * Memoized selector for all product categories.
 * @returns {string[]} Array of unique categories (with 'all' and 'Uncategorized')
 */
export const selectProductCategories = createSelector(
  productsSelectors.selectAll,
  (products) => [
    "all",
    ...Array.from(new Set(products.map((p) => p.category || "Uncategorized"))),
  ]
);

export default productsSlice.reducer;
