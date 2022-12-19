import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../services/auth.service";
import { LoginThunkArgsInterface } from "../interfaces/user.interface";
import { AppState } from "./store";
import { ACTIONS, ACTIONS_PREFIX, THUNK_STATUS } from "../enums/actions.enums";
import { ThunkStatusType } from "../types/types";
import { AccessTokenResponseInterface } from "../interfaces/auth.interface";

export const fetchLoginWithCredential = createAsyncThunk(
  `${ACTIONS_PREFIX.AUTHENTICATE}/${ACTIONS.FETCH_CREDENTIAL}`,
  async (loginThunkArgs: LoginThunkArgsInterface = {}, thunkAPI) => {
    try {
      const access_token: AccessTokenResponseInterface =
        await authService.requestCredential(loginThunkArgs);
      return access_token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface AccessTokenState {
  access_token: string;
  status: ThunkStatusType;
  error: string | null;
}

const initialState = {
  access_token: "",
  status: THUNK_STATUS.IDLE,
  error: null,
} as AccessTokenState;

// Then, handle actions in your reducers:
export const authSlice = createSlice({
  name: ACTIONS_PREFIX.AUTHENTICATE,
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    //Login
    builder.addCase(fetchLoginWithCredential.pending, (state, action) => {
      state.status = THUNK_STATUS.PENDING;
      state.error = null;
    });

    builder.addCase(fetchLoginWithCredential.fulfilled, (state, action) => {
      const loadedAccessToken = action.payload;
      state.status = THUNK_STATUS.SUCCEEDED;
      state.error = null;
      state.access_token = loadedAccessToken.access_token;
    });

    builder.addCase(fetchLoginWithCredential.rejected, (state, action) => {
      if (action.error.message) {
        state.status = THUNK_STATUS.FAILED;
        state.error = action.error.message;
      }
    });
  },
});

export const selectAccessTokenState = (state: AppState) =>
  state.authenticate.access_token;
export const getAccessTokenStatus = (state: AppState) =>
  state.authenticate.status;
export const getAccessTokenError = (state: AppState) =>
  state.authenticate.error;

export default authSlice.reducer;
