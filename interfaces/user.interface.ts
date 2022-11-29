import NextApiResponse from "next";
export interface Role {
  name: string;
  permissions: string[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  job: string;
  description: string;
  photo: string;
  role: Role;
}

export interface Meta {
  method: string;
  urn: string;
  uri: string;
}

export interface NestUserApiResponse {
  data: User[];
  meta: Meta;
}

export interface IUserThunkArgs {
  id?: string;
}

export interface ILoginThunkArgs {
  email?: string;
  password?: string;
}
