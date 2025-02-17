import React from 'react';
import { motion } from 'framer-motion';
import './about.scss'

const About = () => {
  return (
    <motion.div 
      className="about-container"
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1 }}
    >
      <div className="about-content">
        <h2>Building a greener tomorrow for the quick-service restaurant industry</h2>
      </div>

      <div className="footer">
        <div className="company">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Gallery</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">News</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Resources</a></li>
          </ul>
        </div>

        <div className="social-media">
          <h3>Follow us on</h3>
          <ul>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="bottom-footer">
        <p>All rights reserved - Cypher Limited 2025</p>
        <div className="policy-links">
          <a href="#">Terms and Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </motion.div>
  );
};

export default About;