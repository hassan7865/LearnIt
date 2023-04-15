import { configureStore,combineReducers} from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
import LoginReducer from './LoginRedux'
import VideoReducer from './VideoRedux'
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  const rootReducer = combineReducers({login:LoginReducer,video:VideoReducer})
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
  
export const persistor = persistStore(store)