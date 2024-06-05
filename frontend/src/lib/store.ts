import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/slice'
import localStorageMiddleware from '@/features/auth/middleware'
import { authAPI } from '@/services/auth'
import { videoAPI } from '@/services/video'
import { notificationAPI } from '@/services/notification'

export const appStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [videoAPI.reducerPath]: videoAPI.reducer,
      [authAPI.reducerPath]: authAPI.reducer,
      [notificationAPI.reducerPath]: notificationAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .prepend(localStorageMiddleware.middleware)
      .concat(authAPI.middleware)
      .concat(videoAPI.middleware)
      .concat(notificationAPI.middleware)
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof appStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']