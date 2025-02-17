import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {  useNavigate } from 'react-router-dom'; // Import useNavigate
import './home.scss'; 
import Contact from '../Contact/Contact';
import About from '../About/About';

function Home({ categories, addToCart }) {
  const navigate = useNavigate(); // Initialize navigate function

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const getRandomPrice = () => {
    return 2000 + Math.floor(Math.random() * 10000);
  };

  const handleImageClick = (cat) => {
    setSelectedCategory({
      ...cat,
      price: getRandomPrice(),
    });
    setQuantity(1);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!selectedCategory) return;
    const itemToAdd = {
      ...selectedCategory,
      quantity,
    };
    addToCart(itemToAdd);
    setSelectedCategory(null);
  };

  return (
    <div className="home">
      <motion.div className="hero">
        <div className="hero-content">
          <motion.h1 initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.8 }}>
            Get your favorite food from Cypher Store
          </motion.h1>
          <motion.p initial={{ y: 20 }} animate={{ y: 0 }} transition={{ duration: 0.8 }}>
            Explore our menu and see what's available closest to you.
          </motion.p>
          {/* ✅ Update button to use navigate */}
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            onClick={() => navigate('/menu')}
          >
            Explore our Menu
          </motion.button>
        </div>

        <div className="hero-image">
          <motion.img 
            src={require('../../assets/jollof.jpg')} 
            alt="Delicious food" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }} 
          />
        </div>
      </motion.div>

      <div className="menu-container" id="menu-section">
        <h1>Our Menu</h1>
        <div className="menu-list">
          {categories.map((cat) => (
            <div className="menu-item" key={cat.idCategory}>
              <img
                src={cat.strCategoryThumb}
                alt={cat.strCategory}
                onClick={() => handleImageClick(cat)}
              />
              <h3>{cat.strCategory}</h3>
            </div>
          ))}
        </div>
        <Contact />
        <About/>
      </div>

      {selectedCategory && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseModal}>
              &times;
            </button>
            <h2>{selectedCategory.strCategory}</h2>
            <p className="price">₦{selectedCategory.price.toLocaleString()}</p>

            <div className="quantity-container">
              <button onClick={handleMinus} className="qty-btn">-</button>
              <span>{quantity}</span>
              <button onClick={handlePlus} className="qty-btn">+</button>
            </div>

            <button className="add-cart-btn" onClick={handleAddToCart}>
              Add to cart
            </button>

            <div className="description-section">
              <h3>Description</h3>
              <p>{selectedCategory.strCategoryDescription}</p>
            </div>

            <div className="share-section">
              <span>Share:</span>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">X</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">F</a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer">P</a>
            </div>

            <div className="reviews-section">
              <h3>Reviews (0)</h3>
              <p>No reviews yet.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;