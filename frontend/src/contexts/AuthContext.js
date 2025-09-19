import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  token: null,
  handleLogout: () => {},
  setUser: () => {},
});
