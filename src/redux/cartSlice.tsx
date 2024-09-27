import { createSlice } from "@reduxjs/toolkit";
interface CartItem {
  id: string;  
  category: string;
  date: string;
  time: {
    seconds: number;
    nanoseconds: number;
  };
  quantity: number;  
}
// Initialize cart state from localStorage or empty array
const initialState = JSON.parse(localStorage.getItem('cart') || '[]') ??[];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    deleteFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    },
    incrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++; // Directly modify the item's quantity
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--; // Decrease quantity only if it's more than 1
      }
    },
  },
});

// Action creators generated for each case reducer function
export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
