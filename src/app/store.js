import { configureStore } from '@reduxjs/toolkit';
import shoppingListReducer from '../features/ShoppingListSlice';

const store = configureStore({
    reducer: {
        shoppingList: shoppingListReducer,
    },
});

export default store;