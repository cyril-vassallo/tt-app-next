export interface CommitAuthorInterface {
  name: string;
  email: string;
  date: string;
}

export interface CommitCommitterInterface {
  name: string;
  email: string;
  date: string;
}

export interface TreeInterface {
  sha: string;
  url: string;
}

export interface VerificationInterface {
  verified: boolean;
  reason: string;
  signature?: any;
  payload?: any;
}

export interface CommitInterface {
  author: CommitAuthorInterface;
  committer: CommitCommitterInterface;
  message: string;
  tree: TreeInterface;
  url: string;
  comment_count: number;
  verification: VerificationInterface;
}

export interface AuthorInterface {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface CommitterInterface {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface ParentInterface {
  sha: string;
  url: string;
  html_url: string;
}

export interface ApiGithubInterface {
  sha: string;
  node_id: string;
  commit: CommitInterface;
  url: string;
  html_url: string;
  comments_url: string;
  author: AuthorInterface;
  committer: CommitterInterface;
  parents: ParentInterface[];
}
