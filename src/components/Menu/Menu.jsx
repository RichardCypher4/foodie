import React, { useEffect, useState } from "react";
import axios from "axios";
import "./menu.scss";

const Menu= () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  
  const getRandomPrice = () => {
    return 2000 + Math.floor(Math.random() * 10000);
  };

  const handleImageClick = (category) => {
    setSelectedCategory({
      ...category,
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
    
    alert(
      `Added ${quantity} of ${selectedCategory.strCategory} to cart at ₦${
        selectedCategory.price
      } each!`
    );
  };

  return (
    <div className="menu-container">
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
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                X
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                F
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer">
                P
              </a>
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
};

export default Menu;