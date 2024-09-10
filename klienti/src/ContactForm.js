import React, { useState } from 'react';
import './ContactForm.css'; // Import the CSS styles or inline the styles.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const ContactForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
            e.preventDefault();
          
            const token = localStorage.getItem('token');
            const url = "http://localhost:5038/api/Contact";
            const data = {
              
              ...formData,
            };
          
            try {
              const response = await fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify(data),
              });
          
              if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
              }
          
              const result = await response.json();
              console.log('Success:', result);
            } catch (error) {
              console.error('Error:', error.message);
            }
          };
                

  return (
    <div className="container-contactus">
      <span className="big-circle"></span>
      <div className="form">
        <div className="contact-info">
          <h3 className="title-contact">Let's get in touch</h3>
          <p className="text">
               We would love to hear from you!                                                                                                                                 
          </p>
          <br />

          <div className="info">
            <div className="information">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
              <p>Prishtine, 10000</p>
            </div>
            <div className="information">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
               <p>spital@gmail.com</p>
            </div>
            <div className="information">
              <FontAwesomeIcon icon={faPhoneAlt} className="icon" />
              <p>(+383) xx-xxx-xxx</p>
            </div>
          </div>

          <div className="social-media">
            <p><b>Connect with us:</b></p>
            <div className="social-icons">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookF} className="icon1" />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} className="icon1" />
              </a>
              <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} className="icon1" />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <h2 id="contactush2"><b>Contact Us</b></h2>
            <input
              type="text"
              className="field"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              className="field"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            
            <textarea
              className="field area"
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            
            <button type="submit" className="button">Send</button>

            <div className="Login-butoni">
              You haven't been logged in yet? <a href="/login">Login here</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
