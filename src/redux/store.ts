import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'

export const user_store = configureStore({
    reducer:{
        name: userReducer
    }
})


export type RootState = ReturnType<typeof user_store.getState>
export type AppDispatch = typeof user_store.dispatch