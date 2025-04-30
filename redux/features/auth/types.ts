export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  role: "admin" | "user";
  status: "active" | "deleted";
  __v: number;
};

export type TAuthState = {
  user: TUser | null;
  token: string | null;
};

export type TSigninPayload = {
  email: string;
  password: string;
};

export type TSignupPayload = {
  name: string;
  email: string;
  password: string;
};
