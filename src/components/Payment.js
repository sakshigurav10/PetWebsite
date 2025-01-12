import React, { useState } from 'react';
import './payment.css';

function Payment({ totalPrice, onPaymentSuccess }) { 
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);  
  const [formData, setFormData] = useState({    
    cardNumber: '', 
    expiryDate: '', 
    cvv: '',
    upiId: '', 
    bankName: '',
    accountNumber: '',
    address: '',                                       
  });     
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });              
  };            

  const handlePaymentSubmit = (e) => {                                                                       
    e.preventDefault();                         
 
    if (!paymentMethod) {
      alert('Please select a payment method');            
      return;
    }               

    // Simulate payment processing delay;
    setIsProcessing(true);                  
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Payment successful using ${paymentMethod}!`);
      onPaymentSuccess();
    }, 2000);  
  };

  return (
    <div className="payment-container">
      <h2>Secure Payment Gateway</h2>           
      <p>Total Amount: ₹{totalPrice}</p>

      <form onSubmit={handlePaymentSubmit}>
        <div className="payment-options">
          <label>
            <input
              type="radio"
              value="Credit Card"
              checked={paymentMethod === 'Credit Card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="icon">💳</span> Credit Card
          </label>
          <label>
            <input
              type="radio"
              value="UPI"
              checked={paymentMethod === 'UPI'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="icon">📱</span> UPI
          </label>
          <label>
            <input
              type="radio"
              value="Net Banking"
              checked={paymentMethod === 'Net Banking'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="icon">🏦</span> Net Banking
          </label>
          <label>
            <input
              type="radio"
              value="Cash on Delivery"
              checked={paymentMethod === 'Cash on Delivery'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="icon">🚚</span> Cash on Delivery
          </label>
        </div>

        {/* Additional fields based on payment method */}
        {paymentMethod === 'Credit Card' && (
          <div className="payment-details">
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="expiryDate"
              placeholder="Expiry Date (MM/YY)"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              name="cvv"
              placeholder="CVV"
              required
              onChange={handleChange}
            />
          </div>
        )}

        {paymentMethod === 'UPI' && (             //              
          <div className="payment-details">
            <input
              type="text"
              name="upiId"
              placeholder="UPI ID"
              required  
              onChange={handleChange}
            />
          </div>                  
        )}
                                                                                             
         {paymentMethod === 'Net Banking' && (
          <div className="payment-details">    
            <input
              type="text"
              name="bankName"
              placeholder="Bank Name"
              required
              onChange={handleChange}       
            />
            <input 
              type="text"
              name="accountNumber"
              placeholder="Account Number" 
              required
              onChange={handleChange} 
            />  
          </div>
        )}
 
        {paymentMethod === 'Cash on Delivery' && (                    
          <div className="payment-details">           
            <input       
              type="text"
              name="address"
              placeholder="Delivery Address"
              required
              onChange={handleChange}     
            /> 
          </div>
        )}

        <button type="submit" className="pay-button" disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Confirm Payment'}
        </button>
      </form>
    </div>
  );
}

export default Payment;
