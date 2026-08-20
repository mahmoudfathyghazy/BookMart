import { useState } from "react";
import { AuthContext } from "./auth-context";
import api from "../services/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setError(null);
    try {
      const results = await api.login(email, password);
      if (!results || results.length === 0) {
        setError("Invalid email or password.");
        return false;
      }
      setUser(results[0]);
      return true;
    } catch {
      setError("Could not log in right now. Please try again.");
      return false;
    }
  };

  const register = async ({ name, email, password }) => {
    setError(null);
    try {
      const newUser = await api.register({
        name,
        email,
        password,
        role: "customer",
      });
      setUser(newUser);
      return true;
    } catch {
      setError("Could not create your account. Please try again.");
      return false;
    }
  };

  const logout = () => setUser(null);

  const value = { user, error, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
