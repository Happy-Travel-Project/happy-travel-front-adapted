'use client'

import { useEffect, useState, useCallback, useMemo, createContext, useContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({
  login: (username, role) => { },
  logout: () => { },
  isAuthenticated: false,
  username: '',
  role: ''
});

export default function AuthContextProvider({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");
    if (storedToken && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
      setRole(storedRole);
    }
  }, []);

  function parseJwt(token) {
    const decoded = jwtDecode(token);
    return {
      username: decoded.sub,
      role: decoded.role
    }
  }

  const login = useCallback(function (token) {
    const { username, role } = parseJwt(token);
    localStorage.setItem("authToken", token);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
    setIsAuthenticated(true)
    setUsername(username);
    setRole(role);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setUsername('');
    setRole('');
  }, []);

  const value = useMemo(() => ({
    login,
    logout,
    isAuthenticated,
    username,
    role
  }), [login, logout, isAuthenticated, username, role]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}




