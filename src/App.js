import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";  
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Delivery from './components/Menu/Menu';
import Home from './components/Home/Home';  
import Navbar from './Navbar/Navbar'; 
import Login from './components/Auth/Login'; 
import Signup from './components/Auth/Signup';      
import axios from 'axios';
import { AuthProvider, useAuth } from './components/Auth/AuthContent';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  return (
    <Router>
      {/* Now AuthProvider is inside Router */}
      <AuthProvider>
        <Navbar cart={cart} />
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home categories={categories} addToCart={addToCart} />
              </ProtectedRoute>
            } 
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu" element={<Delivery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;