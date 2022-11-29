import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userServices } from "../services/user.services";
import { User } from "../interfaces/user.interface";
import { AppState } from "./store";

//TODO - add async methods in reducer - https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async (args, thunkAPI) => {
    try {
      const users: User[] = await userServices.getUsers();
      return users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface UsersState {
  users: User[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState = {
  users: [],
  status: "idle",
  error: null,
} as UsersState;

// Then, handle actions in your reducers:
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // USERS
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const loadedUsers = action.payload.map((user: User) => user);
      state.status = "succeeded";
      state.error = null;
      state.users = state.users.concat(loadedUsers);
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      if (action.error.message) {
        state.status = "failed";
        state.error = action.error.message;
      }
    });
  },
});

export const selectUsersState = (state: AppState) => state.users.users;
export const getUsersStatus = (state: AppState) => state.users.status;
export const getUsersError = (state: AppState) => state.users.error;

export default usersSlice.reducer;
