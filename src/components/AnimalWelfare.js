import React from 'react';
import './welfare.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const AnimalWelfare = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    paymentMethod: 'Credit Card',
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Form input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form validation handler
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.amount || formData.amount <= 0) errors.amount = 'Donation amount is required';
    return errors;
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      setSuccessMessage('Thank you for your generous donation!');
      setFormData({ name: '', email: '', amount: '', paymentMethod: 'Credit Card' });
      setFormErrors({});
    } else {
      setFormErrors(errors);
      setSuccessMessage('');
    }
  };

  const navigate = useNavigate(); // Initialize navigate function
  const handleViewMore = () => {
    navigate('/more-pets'); // Redirect to '/more-pets'
  };


  return (
    <div>

    <Header/>
    <div className="AnimalWelfare">
    <section className="hero">
      <h2>Welcome to Our Animal Welfare Page</h2>
      <p>We are dedicated to promoting the health, happiness, and safety of all pets.</p>
    </section>

    <section id="core-values" className="core-values">
      <h3>Our Core Values</h3>
      <ul>
        <li><strong>Companionship:</strong> Pets are part of our family.</li>
        <li><strong>Health & Nutrition:</strong> Balanced diets and regular care.</li>
        <li><strong>Behavioral Health:</strong> Socialization and enrichment.</li>
        <li><strong>Respect for Animals:</strong> Humane treatment and compassion.</li>
      </ul>
    </section>

    <section id="pet-welfare" className="pet-welfare">
      <h3>Key Aspects of Pet Welfare</h3>
      <div className="guidelines">
        <div>
          <h4>Nutrition & Hydration</h4>
          <p>Provide a balanced diet and fresh water daily.</p>
        </div>
        <div>
          <h4>Exercise & Mental Stimulation</h4>
          <p>Ensure regular physical activity and mental challenges.</p>
        </div>
        <div>
          <h4>Health Care</h4>
          <p>Routine vet visits and parasite prevention are essential.</p>
        </div>
        <div>
          <h4>Comfortable Living</h4>
          <p>Provide a safe, clean, and comfortable living space.</p>
        </div>
      </div>
    </section>

    <section id="adopt" className="adopt">
      <h3>Adopt a Pet</h3>
      <p>Consider adopting from local shelters. Every pet deserves a loving home.</p>
      <button onClick={handleViewMore}>Find Pets for Adoption</button>
    </section>

    <section id="organizations">
        <h3>Animal Welfare Organizations</h3>
        <p>Here are some notable organizations that work tirelessly to protect and advocate for animals:</p>
        <ul className="organizations-list">
        <li><a href="https://www.cawc.in/" target="_blank" rel="noopener noreferrer">CAWC (Companion Animal Welfare Centre)</a></li>
          <li><a href="https://www.peaceforanimals.in/" target="_blank" rel="noopener noreferrer">Peace for Animals</a></li>
          <li><a href="https://www.friendicoes.org/" target="_blank" rel="noopener noreferrer">Friendicoes SECA</a></li>
          <li><a href="https://www.wsdindia.org/" target="_blank" rel="noopener noreferrer">WSD (Wildlife SOS India)</a></li>
          <li><a href="https://www.petaindia.com/" target="_blank" rel="noopener noreferrer">PETA India</a></li>
          <li><a href="https://www.hsi.org/india/" target="_blank" rel="noopener noreferrer">Humane Society International India</a></li>
        </ul>
      </section>

        {/* Donation Form Section */}
      <section id="donate">
        <h3>Make a Donation</h3>
        <p>Your donation helps support the care, shelter, and rehabilitation of animals in need.</p>

        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="donation-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={formErrors.name ? 'error' : ''}
            />
            {formErrors.name && <span className="error-message">{formErrors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={formErrors.email ? 'error' : ''}
            />
            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="amount">Donation Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={formErrors.amount ? 'error' : ''}
              min="1"
            />
            {formErrors.amount && <span className="error-message">{formErrors.amount}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod">Payment Method </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
     
          <button type="submit">Donate Now</button>
        </form>
      </section>

    </div>
    <Footer/>
    </div>
  );
};

export default AnimalWelfare;