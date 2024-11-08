import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import filtersReducer from './filterSlice'

import { persistStore, persistReducer,  FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { supabaseApi } from "./apiSlice";

let persistConf = {
    key: 'courseblast',
    storage
}

const persistedUserReducer = persistReducer(persistConf, userReducer)

export const user_store = configureStore({
    reducer:{
        user_information: persistedUserReducer,
        selected_filters:  filtersReducer,
        [supabaseApi.reducerPath]: supabaseApi.reducer
    },
    middleware:  (getDefaultMiddleware) =>  getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(supabaseApi.middleware),
})

export const persisted_store = persistStore(user_store)

export type RootState = ReturnType<typeof user_store.getState>
export type AppDispatch = typeof user_store.dispatch