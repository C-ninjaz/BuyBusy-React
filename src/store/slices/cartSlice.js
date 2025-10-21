// cartSlice.js
// Redux slice for managing the shopping cart state, including async thunks for Firestore operations.

import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

/**
 * Async thunk to fetch all cart items for a user from Firestore.
 * @param {string} uid - User ID
 */
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (uid, thunkAPI) => {
    try {
      const cartRef = collection(db, "usersCarts", uid, "myCart");
      const snapshot = await getDocs(cartRef);
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

/**
 * Async thunk to add a product to the user's cart in Firestore.
 * @param {object} payload - { uid, product }
 */
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ uid, product }, thunkAPI) => {
    try {
      const cartItem = {
        productId: product.id,
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl || product.image,
        qty: 1,
        addedAt: serverTimestamp(),
      };
      await addDoc(collection(db, "usersCarts", uid, "myCart"), cartItem);
      return cartItem;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

/**
 * Async thunk to remove a cart item from Firestore.
 * @param {object} payload - { uid, cartItemId }
 */
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ uid, cartItemId }, thunkAPI) => {
    try {
      await deleteDoc(doc(db, "usersCarts", uid, "myCart", cartItemId));
      return cartItemId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

/**
 * Async thunk to change the quantity of a cart item in Firestore.
 * @param {object} payload - { uid, cartItemId, newQty }
 */
export const changeQty = createAsyncThunk(
  "cart/changeQty",
  async ({ uid, cartItemId, newQty }, thunkAPI) => {
    try {
      const docRef = doc(db, "usersCarts", uid, "myCart", cartItemId);
      if (newQty <= 0) {
        await deleteDoc(docRef);
        return { cartItemId, removed: true };
      } else {
        await updateDoc(docRef, { qty: newQty });
        return { cartItemId, newQty };
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

/**
 * Cart slice state and reducers.
 */
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Array of cart items
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Error message if any
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(changeQty.fulfilled, (state, action) => {
        if (action.payload.removed) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.cartItemId
          );
        } else {
          const item = state.items.find(
            (i) => i.id === action.payload.cartItemId
          );
          if (item) item.qty = action.payload.newQty;
        }
      });
  },
});

/**
 * Memoized selector for cart total price.
 * @param {object} state - Redux state
 * @returns {number} Total price of all items in cart
 */
export const selectCartTotal = createSelector(
  (state) => state.cart.items,
  (items) => items.reduce((sum, item) => sum + item.price * item.qty, 0)
);

export default cartSlice.reducer;
