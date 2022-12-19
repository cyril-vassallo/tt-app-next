import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../services/user.service";
import {
  LoginThunkArgsInterface,
  UserInterface,
} from "../interfaces/user.interface";
import { AppState } from "./store";
import { ACTIONS, ACTIONS_PREFIX, THUNK_STATUS } from "../enums/actions.enums";
import { ThunkStatusType } from "../types/types";

export const fetchCurrentUserAccount = createAsyncThunk(
  `${ACTIONS_PREFIX.ACCOUNT}/${ACTIONS.FETCH_LOGIN}`,
  async (_, thunkAPI) => {
    try {
      const account: UserInterface = await userService.findCurrentUserAccount();
      return account;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchCreateAccount = createAsyncThunk(
  `${ACTIONS_PREFIX.SUBSCRIBE}/${ACTIONS.FETCH_CREATE_ACCOUNT}`,
  async (loginThunkArgs: LoginThunkArgsInterface = {}, thunkAPI) => {
    try {
      const account: UserInterface = await userService.createOne(
        loginThunkArgs
      );
      return account;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface AccountState {
  account: UserInterface | null;
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
    //Login
    builder.addCase(fetchCurrentUserAccount.pending, (state, action) => {
      state.status = THUNK_STATUS.PENDING;
      state.error = null;
    });

    builder.addCase(fetchCurrentUserAccount.fulfilled, (state, action) => {
      const loadedAccount = action.payload;
      state.status = THUNK_STATUS.SUCCEEDED;
      state.error = null;
      state.account = loadedAccount;
    });

    builder.addCase(fetchCurrentUserAccount.rejected, (state, action) => {
      if (action.error.message) {
        state.status = THUNK_STATUS.FAILED;
        state.error = action.error.message;
      }
    });

    //Create
    builder.addCase(fetchCreateAccount.pending, (state, action) => {
      console.log(THUNK_STATUS.PENDING);
      state.status = THUNK_STATUS.PENDING;
      state.error = null;
    });

    builder.addCase(fetchCreateAccount.fulfilled, (state, action) => {
      const loadedAccount = action.payload;
      console.log(THUNK_STATUS.SUCCEEDED);
      state.status = THUNK_STATUS.SUCCEEDED;
      state.error = null;
    });

    builder.addCase(fetchCreateAccount.rejected, (state, action) => {
      console.log(THUNK_STATUS.FAILED);
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
