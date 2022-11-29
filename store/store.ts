import { authSlice } from "./authSlice";
import { counterSlice } from "./counterSlice";
import { usersSlice } from "./usersSlice";

import { createWrapper } from "next-redux-wrapper";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountSlice } from "./AccountSlice";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [counterSlice.name]: counterSlice.reducer,
    [usersSlice.name]: usersSlice.reducer,
    [accountSlice.name]: accountSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
