import React, { useState } from 'react';
import './supheader.css';
import { Link, useNavigate } from 'react-router-dom';

function HeaderSup({ cartCount }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/supplies?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <header className="supheader">
      <div className="suplogo">
        <Link to="/">PetCare</Link>
      </div>
      <nav className="supnav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/supplies">Pet Supplies</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><Link to="/contactus">Contact</Link></li>
        </ul>
      </nav>
      <form className="supsearch-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>
      <div className="cart-icon">
        <Link to="/cart">
          <i className="fa-solid fa-cart-shopping"></i>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
}

export default HeaderSup;
