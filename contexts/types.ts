export type TUser = {
  name: string;
  email: string;
  password: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  accessToken: string;
};

export type AuthContextType = {
  authState: AuthState;
  authenticate: (accessToken: string) => Promise<void>;
  signOut: () => Promise<void>;
  userData: TUser | null;
  setUserData: React.Dispatch<React.SetStateAction<TUser | null>>;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};
