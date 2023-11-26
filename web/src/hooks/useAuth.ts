import { useState } from "react";
import { Auth, User } from "../@types/types";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UifQ.OFY_3SbHl2YaM7Y4Lj24eVMtcDaGEZU7KRzYCV4cqog";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    setUser({ username: "johndoe", token: TOKEN });
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout } as Auth;
};

export { useAuth };
