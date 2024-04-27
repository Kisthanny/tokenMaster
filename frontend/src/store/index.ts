import { configureStore } from '@reduxjs/toolkit'
import accountSlice from './accountSlice'

export const store = configureStore({
    reducer: {
        account: accountSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch