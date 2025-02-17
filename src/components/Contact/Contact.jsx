import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "./contact.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Example submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Message sent!");
    // Reset form or handle further logic
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    
    <div className="contact-container">
     
      <div className="contact-cards">
        
        <div className="contact-card">
          <div className="contact-icon">
            <FaMapMarkerAlt />
          </div>
          <h3>Visit us at</h3>
          <p>Suite 59 ALEXComplex, Matama, Abuja Nigeria.</p>
          <p>No 12 walter, Conventry, LONDON</p>
        </div>

        {/* Card 2: Call Us */}
        <div className="contact-card">
          <div className="contact-icon">
            <FaPhoneAlt />
          </div>
          <h3>Call us on</h3>
          <p>+234 903 758 9818, </p>
        </div>

        {/* Card 3: Email Us */}
        <div className="contact-card">
          <div className="contact-icon">
            <FaEnvelope />
          </div>
          <h3>Email us at</h3>
          <p>Oladayorichard1@gmail.com</p>
        </div>
      </div>

      {/* ---------- CONTACT FORM ---------- */}
      <div className="contact-form-container">
        <form onSubmit={handleSubmit}>
          <label>First name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <label>Last name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="username@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Phone number</label>
          <input
            type="tel"
            name="phone"
            placeholder="+234 801 234 5678"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Message</label>
          <textarea
            name="message"
            placeholder="Enter your message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;