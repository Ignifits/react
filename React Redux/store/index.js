import { configureStore } from '@reduxjs/toolkit'
import cartSlices from './cart-slices';
import uiSlices from "./ui-slices";


const store = configureStore({
    reducer: {ui: uiSlices.reducer, cart: cartSlices.reducer}
})

export default store;