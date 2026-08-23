import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import api from "../services/api";

const SESSION_KEY = "bookmart:user";

/**
 * Reads the persisted session so a page refresh (or opening /admin
 * directly) keeps the user logged in instead of bouncing to /login.
 */
function readStoredUser() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [error, setError] = useState(null);

  // Mirror the session to localStorage whenever it changes.
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    } catch {
      // storage unavailable -> session simply not persisted
    }
  }, [user]);

  const login = async (email, password) => {
    setError(null);
    try {
      const results = await api.login(email, password);
      // Case-insensitive match so "User@Email.com" matches "user@email.com".
      const match = results?.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password
      );
      if (!match) {
        setError("invalidCredentials");
        return false;
      }
      setUser(match);
      return true;
    } catch {
      setError("loginFailed");
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
      setError("registerFailed");
      return false;
    }
  };

  const logout = () => setUser(null);

  const value = { user, error, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
