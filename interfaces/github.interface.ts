import { MetaInterface } from "../core/interfaces";

export interface GithubInterface {
  id: string;
  user: string;
  owner: string;
  repository: string;
  branch: string;
  enabled: boolean;
  token: string;
}

export interface GithubResponseInterface {
  data: GithubInterface;
  meta: MetaInterface;
}

// ThunkArgs Interfaces
