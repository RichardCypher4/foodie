import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../components/Auth/AuthContent";
import Logo from "../assets/kitchen.jpg";
import "./navbar.scss";

const NavMenu = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "About", path: "/about" },
  { id: 3, title: "Contact", path: "/contact" },
  { id: 4, title: "Menu", path: "/menu" },
];

// Slide down animation
const slideDown = (delay) => ({
  initial: { y: "-100%", opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.8, delay } },
});

const Navbar = ({ cart }) => {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  // Checkout form state
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    paymentMethod: "card",
  });

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleCart = () => setShowCart(!showCart);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Data:", { cartItems: cart, ...formData });
    alert("Your order has been placed!");
    setShowCart(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <motion.img
          src={Logo}
          alt="Logo"
          className="navbar-logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        <button className="navbar-toggle" onClick={toggleMenu}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          {NavMenu.map((menu) => (
            <motion.li
              key={menu.id}
              className="navbar-item"
              variants={slideDown(menu.id * 0.1)}
              initial="initial"
              animate="animate"
            >
              <Link to={menu.path} className="navbar-link" onClick={() => setMenuOpen(false)}>
                {menu.title}
              </Link>
            </motion.li>
          ))}

          {isAuthenticated ? (
            <li className="navbar-item">
              <button className="logout-button" onClick={logout}>
                Logout
              </button>
            </li>
          ) : (
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            </li>
          )}
        </ul>

        <motion.div className="navbar-cart" variants={slideDown(1)} initial="initial" animate="animate">
          <button className="cart-button" onClick={toggleCart}>
            <IoCartOutline />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </button>
        </motion.div>
      </div>

      {showCart && (
        <div className="cart-modal-overlay" onClick={toggleCart}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-cart-btn" onClick={toggleCart}>
              &times;
            </button>

            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.strCategoryThumb} alt={item.strCategory} className="cart-item-image" />
                  <div>
                    <h4>{item.strCategory}</h4>
                    <p>₦{item.price.toLocaleString()} x {item.quantity}</p>
                  </div>
                </div>
              ))
            )}

            {cart.length > 0 && (
              <>
                <hr />
                <h3>Checkout Details</h3>
                <form onSubmit={handleSubmit} className="checkout-form">
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                  <label htmlFor="address">Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} required />

                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                  <label htmlFor="paymentMethod">Payment Method</label>
                  <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                    <option value="card">Credit/Debit Card</option>
                    <option value="transfer">Bank Transfer</option>
                    <option value="delivery">Pay on Delivery</option>
                  </select>

                  <button type="submit">Place Order</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;