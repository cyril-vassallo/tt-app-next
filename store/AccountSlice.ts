import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userServices } from "../services/user.services";
import { ILoginThunkArgs, User } from "../interfaces/user.interface";
import { AppState } from "./store";
import { ACTIONS, ACTIONS_PREFIX, THUNK_STATUS } from "../enums/actions.enums";
import { ThunkStatusType } from "../types/types";

//TODO - add async methods in reducer - https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchLogin = createAsyncThunk(
  `${ACTIONS_PREFIX.ACCOUNT}/${ACTIONS.FETCH_LOGIN}`,
  async (loginThunkArgs: ILoginThunkArgs = {}, thunkAPI) => {
    try {
      const account: User = await userServices.login(loginThunkArgs);
      return account;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface AccountState {
  account: User | null;
  status: ThunkStatusType;
  error: string | null;
}

const initialState = {
  account: null,
  status: THUNK_STATUS.IDLE,
  error: null,
} as AccountState;

// Then, handle actions in your reducers:
export const accountSlice = createSlice({
  name: ACTIONS_PREFIX.ACCOUNT,
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    //Account
    builder.addCase(fetchLogin.pending, (state, action) => {
      state.status = THUNK_STATUS.PENDING;
      state.error = null;
    });

    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      const loadedAccount = action.payload;
      state.status = THUNK_STATUS.SUCCEEDED;
      state.error = null;
      state.account = loadedAccount;
    });

    builder.addCase(fetchLogin.rejected, (state, action) => {
      if (action.error.message) {
        state.status = THUNK_STATUS.FAILED;
        state.error = action.error.message;
      }
    });
  },
});

export const selectAccountState = (state: AppState) => state.account.account;
export const getAccountStatus = (state: AppState) => state.account.status;
export const getAccountError = (state: AppState) => state.account.error;

export default accountSlice.reducer;
