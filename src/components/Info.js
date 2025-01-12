import React from 'react';
import { Link } from 'react-router-dom';
import './Info.css'; // Create this CSS file for styling

const Info = () => {
  return (
    <div className="info-container">
      <h1 className="info-heading">You Should Know</h1>
      <div className="info-sections">
        <Link to='/disease' className="info-section">
          <div className="info-icon">🦠</div>
          <h3>Diseases</h3>
          <p>Learn about various diseases affecting pets and how to manage them.</p>
        </Link>

        <Link to='/petguidelines' className="info-section">
          <div className="info-icon">📖</div>
          <h3>Pet Care Guidelines</h3>
          <p>Access expert tips and comprehensive care guides to keep your pets happy and healthy.</p>
        </Link>

        <Link to="/animalwelfare" className="info-section">
          <div className="info-icon">🐾</div>
          <h3>Animal Welfare</h3>
          <p>Discover how to ensure the well-being and proper care of animals.</p>
        </Link>
        
      </div>      
    </div>
  );
};

export default Info;
