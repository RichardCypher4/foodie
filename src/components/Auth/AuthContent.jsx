import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Fix: Declare navigate inside the component

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }
  }, []);

  const signup = (email, password) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the user already exists
    if (users.find((user) => user.email === email)) {
      alert("User already exists! Please log in.");
      return;
    }

    // Add new user
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Set current user and navigate to home
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setIsAuthenticated(true);
    setUser(newUser);
    navigate("/");
  };

  const login = (email, password) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      // Store the current logged-in user
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      setIsAuthenticated(true);
      setUser(foundUser);
      navigate("/");
    } else {
      alert("Invalid email or password!");
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login"); // Fix: Call navigate inside the component
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);