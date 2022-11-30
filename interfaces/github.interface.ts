export interface GithubInterface {
  id: string;
  user: string;
  owner: string;
  repository: string;
  branch: string;
  enabled: boolean;
  token: string;
}

export interface MetaInterface {
  method: string;
  urn: string;
  uri: string;
}

export interface GithubResponseInterface {
  data: GithubInterface;
  meta: MetaInterface;
}
