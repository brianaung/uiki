import { createContext, useContext } from "react";
import { useAuth } from "./useAuth";
import { Auth } from "../@types/types";

const AuthContext = createContext<Auth | {}>({});

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export { useAuthContext, AuthProvider };
