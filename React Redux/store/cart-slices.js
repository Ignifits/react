import { createSlice } from "@reduxjs/toolkit";


const cartSlices = createSlice({
    name: 'cart',
    initialState: {
        items:[],
        totalQuantity:0,
        changed:false
    },
    reducers:{
        addItems(state, action){
            const newItems = action.payload;
            state.totalQuantity = state.totalQuantity + newItems.quantity;
            const total    = newItems.price * newItems.quantity;
            state.changed=false;
            state.items = [...state.items, {
                itemId: newItems.id, 
                price: newItems.price, 
                quantity: newItems.quantity, 
                totalprice: total,
                name: newItems.title}]
        },
        addItem(state, action){
            const newItem = action.payload;
            const existingItems = state.items.find(function(item_) {  
                return item_.itemId === newItem.id
            })
            state.changed=true;
            state.totalQuantity++;
            if (!existingItems){
                state.items = [...state.items, {
                    itemId: newItem.id, 
                    price: newItem.price, 
                    quantity: 1, 
                    totalprice: newItem.price,
                    name: newItem.title}]

            }else{
                existingItems.quantity++
                existingItems.totalprice = existingItems.totalprice + newItem.price;
            }
            console.log(state.items)
            
        },
        removeItem(state, action){
            const id = action.payload;
            const existingItem = state.items.find((item) => item.itemId === id);
            state.totalQuantity--;
            state.changed=true;
            if (existingItem.quantity === 1){
                state.items = state.items.filter((item) => item.id !== id);
            }else{
                existingItem.quantity--;
                existingItem.totalprice = existingItem.totalprice - existingItem.price;
            }
        },
    }
})




export const cartActions = cartSlices.actions;
export default cartSlices;