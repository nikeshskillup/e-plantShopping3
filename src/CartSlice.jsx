import { createSlice } from '@reduxjs/toolkit';

// Create the cart slice
export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {

    // Add item to the cart
    : (state, action) => {
        const { name, image, cost } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            state.items.push({ name, image, cost, quantity: 1});
        }
    },

    // Remove item from the cart by name
    : (state, action) => {
        const { name } = action.payload;
        state.items = state.items.filter(item => item.name !== name);
    },

    // Update item quantity
    updateQuantity: (state, action) => {
        const { name } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        
            existingItem.quantity = quantity;
        } else if (existingItem && quantity === 0) {
            state.items = state.items.filter(item => item.name !== name);
        }
    },
  },
});

// Export action creators for use in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer as default to use in store.js
export default CartSlice.reducer;
