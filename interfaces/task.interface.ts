import { MetaInterface } from "../core/interfaces";

export interface CommitInterface {
  hash: string;
  url: string;
}

export interface TaskInterface {
  id: string;
  user: string;
  date: string;
  list: string[];
  commits: CommitInterface[];
}

export interface TasksResponseInterface {
  data: TaskInterface[];
  meta: MetaInterface;
}

export interface TaskResponseInterface {
  data: TaskInterface;
  meta: MetaInterface;
}

// ThunkArgs Interfaces
