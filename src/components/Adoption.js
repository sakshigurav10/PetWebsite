import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import './Adoption.css';

const adoptionData = [
  { id: 1, name: 'Bella', type: 'Dog', imageUrl: require('../images/adopt1.jpeg') },
  { id: 2, name: 'Max', type: 'Cat', imageUrl: require('../images/adopt2.jpeg') },
  { id: 3, name: 'Luna', type: 'Rabbit', imageUrl: require('../images/adopt3.jpeg') }
];

const Adoption = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleViewMore = () => {
    navigate('/more-pets'); // Redirect to '/more-pets'
  };

  return (
    <div className="adoption">
      <h2>Adopt a Pet</h2>
      <div className="adoption-container">
        {adoptionData.map(pet => (
          <div className="adoption-card" key={pet.id}>
            <img src={pet.imageUrl} alt={pet.name} className="adoption-image" />
            <div className="adoption-info">
              <h3>{pet.name}</h3>
              <p>Type: {pet.type}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="view-more">
        <button className="button-view-more" onClick={handleViewMore}>
          Check-out for more
        </button>
      </div>
    </div>
  );
};

export default Adoption;
