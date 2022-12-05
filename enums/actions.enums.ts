export enum ACTIONS_PREFIX {
  ACCOUNT = "account",
  USERS = "users",
  GITHUB = "github",
  TASKS = "tasks",
  SUBSCRIBE = "subscribe",
}

export enum ACTIONS {
  FETCH_LOGIN = "fetchLogin",
  FETCH_USERS = "fetchUsers",
  FETCH_USER_TASKS = "fetchUserTasks",
  FETCH_USER_GITHUB = "fetchUserGithub",
  FETCH_CREATE_ACCOUNT = "fetchCreateAccount",
}

export enum THUNK_STATUS {
  IDLE = "idle",
  PENDING = "pending",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}
