import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reduxSlice } from './ReduxSlice'
import activeUsersReducers from './features/activeUsersSlice'

const rootReducer = combineReducers({
  activeUsers: activeUsersReducers
})

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Disable serializable check if needed
      }),
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
