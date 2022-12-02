import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TaskInterface } from "../interfaces/task.interface";
import { ThunkStatusType } from "../types/types";
import { ACTIONS, ACTIONS_PREFIX, THUNK_STATUS } from "../enums/actions.enums";
import { UserThunkArgsInterface } from "../interfaces/user.interface";
import { taskService } from "../services/task.service";
import { AppState } from "./store";

export const fetchTasksByUser = createAsyncThunk(
  `${ACTIONS_PREFIX.TASKS}/${ACTIONS.FETCH_USER_TASKS}`,
  async (userThunkArgs: UserThunkArgsInterface = {}, thunkAPI) => {
    try {
      const tasks: TaskInterface[] = await taskService.findByUserId(
        userThunkArgs
      );
      return tasks;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface TasksState {
  tasks: TaskInterface[];
  todayTask: TaskInterface | null;
  status: ThunkStatusType;
  error: string | null;
}

const initialState = {
  tasks: [],
  todayTask: null,
  status: "idle",
  error: null,
} as TasksState;

export const tasksSlice = createSlice({
  name: ACTIONS_PREFIX.TASKS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasksByUser.pending, (state, action) => {
      state.status = THUNK_STATUS.PENDING;
    });
    builder.addCase(fetchTasksByUser.fulfilled, (state, action) => {
      const loadedTasks: TaskInterface[] = action.payload.map((task) => task);
      state.status = THUNK_STATUS.SUCCEEDED;
      state.error = null;
      state.tasks = state.tasks.concat(loadedTasks);
    });
    builder.addCase(fetchTasksByUser.rejected, (state, action) => {
      state.status = THUNK_STATUS.FAILED;
    });
  },
});

export const selectTasksState = (state: AppState) => state.tasks.tasks;
export const selectTodayTaskState = (state: AppState) => state.tasks.todayTask;
export const getTasksStatus = (state: AppState) => state.tasks.status;
export const getTasksError = (state: AppState) => state.tasks.error;

export default tasksSlice.reducer;
