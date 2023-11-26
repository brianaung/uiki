import { useState } from "react";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UifQ.OFY_3SbHl2YaM7Y4Lj24eVMtcDaGEZU7KRzYCV4cqog";

const useAuth = () => {
  const [user, setUser] = useState<{
    username: string;
    token: string;
  } | null>(null);

  const login = () => {
    setUser({ username: "johndoe", token: TOKEN });
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout };
};

export { useAuth };
