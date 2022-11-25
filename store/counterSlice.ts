import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

// Type for our state
export interface counterState {
  counterState: number;
}

// Initial state
const initialState: counterState = {
  counterState: 0,
};

// Actual Slice
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.counterState += 1;
    },
    decrement: (state, action) => {
      if (state.counterState > 0) state.counterState -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export const selectCounterState = (state: AppState) =>
  state.counter.counterState;

export default counterSlice.reducer;
