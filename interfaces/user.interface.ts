import { MetaInterface } from "../core/interfaces";

export interface RoleInterface {
  name: string;
  permissions: string[];
}

export interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  job: string;
  description: string;
  photo: string;
  role: RoleInterface;
}

export interface UsersResponseInterface {
  data: UserInterface[];
  meta: MetaInterface;
}

export interface UserResponseInterface {
  data: UserInterface;
  meta: MetaInterface;
}

// ThunkArgs Interfaces

export interface UserThunkArgsInterface {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  job?: string;
  description?: string;
  photo?: string;
  role?: RoleInterface;
}

export interface LoginThunkArgsInterface {
  email?: string;
  password?: string;
}
