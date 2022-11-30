import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../services/user.service";
import { UserInterface } from "../interfaces/user.interface";
import { AppState } from "./store";
import { ACTIONS, ACTIONS_PREFIX, THUNK_STATUS } from "../enums/actions.enums";
import { ThunkStatusType } from "../types/types";

//TODO - add async methods in reducer - https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchUsers = createAsyncThunk<UserInterface[]>(
  `${ACTIONS_PREFIX.USERS}/${ACTIONS.FETCH_USERS}`,
  async (_, thunkAPI) => {
    try {
      const users: UserInterface[] = await userService.findAll();
      return users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface UsersState {
  users: UserInterface[];
  status: ThunkStatusType;
  error: string | null;
}

const initialState = {
  users: [],
  status: THUNK_STATUS.IDLE,
  error: null,
} as UsersState;

// Then, handle actions in your reducers:
export const usersSlice = createSlice({
  name: ACTIONS_PREFIX.USERS,
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // USERS
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.status = THUNK_STATUS.PENDING;
      state.error = null;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const loadedUsers: UserInterface[] = action.payload.map((user) => user);
      state.status = THUNK_STATUS.SUCCEEDED;
      state.error = null;
      state.users = state.users.concat(loadedUsers);
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      if (action.error.message) {
        state.status = THUNK_STATUS.FAILED;
        state.error = action.error.message;
      }
    });
  },
});

export const selectUsersState = (state: AppState) => state.users.users;
export const getUsersStatus = (state: AppState) => state.users.status;
export const getUsersError = (state: AppState) => state.users.error;

export default usersSlice.reducer;
