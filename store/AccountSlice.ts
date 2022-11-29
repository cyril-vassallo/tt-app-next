import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userServices } from "../services/user.services";
import { User, IUserId } from "../interfaces/user.interface";
import { AppState } from "./store";

//TODO - add async methods in reducer - https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchAccount = createAsyncThunk(
  "account/fetchAccount",
  async (userId: IUserId = {}, thunkAPI) => {
    try {
      const account: User = await userServices.getUser(userId);
      return account;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface AccountState {
  account: User | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState = {
  account: null,
  status: "idle",
  error: null,
} as AccountState;

// Then, handle actions in your reducers:
export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    //Account
    builder.addCase(fetchAccount.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });

    builder.addCase(fetchAccount.fulfilled, (state, action) => {
      const loadedAccount = action.payload;
      state.status = "succeeded";
      state.error = null;
      state.account = loadedAccount;
    });

    builder.addCase(fetchAccount.rejected, (state, action) => {
      if (action.error.message) {
        state.status = "failed";
        state.error = action.error.message;
      }
    });
  },
});

export const selectAccountState = (state: AppState) => state.account.account;
export const getAccountStatus = (state: AppState) => state.account.status;
export const getAccountError = (state: AppState) => state.account.error;

export default accountSlice.reducer;
