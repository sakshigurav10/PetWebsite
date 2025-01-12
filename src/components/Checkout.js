import React from 'react';
import { useNavigate } from 'react-router-dom';
import './checkout.css';
import HeaderSup from '../components/HeaderSup';
import Footer from '../components/Footer';

function Checkout() {
  const navigate = useNavigate();

  const handlePayment = () => {
    alert('Payment Successful!');
    localStorage.removeItem('cart');
    navigate('/');
  };

  return (
    <>
      <HeaderSup />
      <div className="checkout-container">
        <h2>Checkout</h2>
        <form className="checkout-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="john@example.com" required />
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea placeholder="Enter your address" required></textarea>
          </div>
          <div className="form-group">
            <label>Card Details</label>
            <input type="text" placeholder="Card Number" required />
            <input type="text" placeholder="MM/YY" required />
            <input type="text" placeholder="CVV" required />
          </div>
          <button type="button" onClick={handlePayment}>
            Pay Now
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
