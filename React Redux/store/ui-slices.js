import { createSlice } from "@reduxjs/toolkit";

const uiSlices = createSlice({
    name: 'ui',
    initialState: {cartIsVisible: false, Notification: null},
    reducers:{
        toggle(state){
            state.cartIsVisible = !state.cartIsVisible
        },
        showNotification(state, action){
            state.notification = {
                status: action.payload.status, 
                title: action.payload.title,
                message: action.payload.message
            }
        }
    }
})

export const uiActions = uiSlices.actions;
export default uiSlices;