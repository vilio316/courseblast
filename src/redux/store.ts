import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'

import { persistStore, persistReducer,  FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER} from "redux-persist";
import storage from "redux-persist/lib/storage";

let persistConf = {
    key: 'courseblast',
    storage
}

const persistedUserReducer = persistReducer(persistConf, userReducer)

export const user_store = configureStore({
    reducer:{
        name: persistedUserReducer,
    },
    middleware:  (getDefaultMiddleware) =>  getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})

export const persisted_store = persistStore(user_store)

export type RootState = ReturnType<typeof user_store.getState>
export type AppDispatch = typeof user_store.dispatch