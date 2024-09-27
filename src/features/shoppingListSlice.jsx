// src/redux/shoppingListSlice.js
import { createSlice } from '@reduxjs/toolkit';

const shoppingListSlice = createSlice({
    name: 'shoppingList',
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items.splice(action.payload, 1);
        },
    },
});

export const { addItem, removeItem } = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
