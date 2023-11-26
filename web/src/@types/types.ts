export type Page = {
  title: string;
  body: string;
};

export type User = {
  username: string;
  token: string;
};

export type Auth = {
  user: User | null;
  login: () => void;
  logout: () => void;
};
