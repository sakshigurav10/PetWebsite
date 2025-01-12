import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css';
import HeaderSup from '../components/HeaderSup';
import Footer from '../components/Footer';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Fetch cart items from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  // Update cart item quantity
  const handleQuantityChange = (id, action) => {     
    let updatedCart = [...cartItems];   
    const itemIndex = updatedCart.findIndex((item) => item._id === id);

    if (itemIndex !== -1) {
      if (action === 'increase') {
        updatedCart[itemIndex].quantity += 1;
      } else if (action === 'decrease' && updatedCart[itemIndex].quantity > 1) {
        updatedCart[itemIndex].quantity -= 1;
      }
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  // Remove item from cart
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Navigate to checkout page
  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <>
      <HeaderSup />
      <div className="cart-container">
        <h2>Your Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty. Add some items!</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <img
                    src={item.image} 
                    alt={item['name of item']}
                    className="cart-item-image"
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                  />
                  <div className="cart-item-details">
                    <h5>{item['name of item']}</h5>
                    <p>₹{item.price.toFixed(2)}</p>
                    <div className="quantity-control">
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item._id, 'decrease')}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item._id, 'increase')}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="remove-item-btn"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h3>Total: ₹{calculateTotal()}</h3>
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
