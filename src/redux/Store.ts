import { configureStore } from '@reduxjs/toolkit'
import { reduxSlice } from './ReduxSlice'

export const Store = () => {
  return configureStore({
    reducer: {
      globlestate:reduxSlice.reducer
    },
  })
}

export type AppStore = ReturnType<typeof Store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']