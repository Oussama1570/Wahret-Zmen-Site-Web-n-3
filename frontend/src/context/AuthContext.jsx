import React, { createContext, useContext, useState } from "react";

// Create Auth Context
export const AuthContext = createContext();

export const AuthProvide = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};
