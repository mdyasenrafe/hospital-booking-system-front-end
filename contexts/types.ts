export type AuthState = {
  isAuthenticated: boolean;
  accessToken: string;
};

export type AuthContextType = {
  authState: AuthState;
  authenticate: (accessToken: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};
