import React, { useState } from "react";
import "./matefinder.css";

const Petfinder = () => {
  const [preferences, setPreferences] = useState({
    petType: "",
    breed: "",
    age: "",
    gender: "",
    temperament: "",
    location: "",
  });

  const [matches, setMatches] = useState([]);

  // Hardcoded pet data for demonstration purposes
  const sampleMatches = [
    {
      name: "Bella",
      petType: "Dog",
      breed: "Golden Retriever",
      age: "3",
      gender: "Female",
      temperament: "Friendly",
      location: "Greenwood Avenue",
    },
    {
      name: "Leo",
      petType: "Cat",
      breed: "Siamese",
      age: "2",
      gender: "Male",
      temperament: "Playful",
      location: "Maple Street",
    },
    {
      name: "Max",
      petType: "Dog",
      breed: "Labrador",
      age: "4",
      gender: "Male",
      temperament: "Calm",
      location: "Oakwood Park",
    },
    {
      name: "Luna",
      petType: "Cat",
      breed: "Persian",
      age: "3",
      gender: "Female",
      temperament: "Shy",
      location: "Elm Street",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handleFindMate = (e) => {
    e.preventDefault();

    // Filter matches based on preferences
    const filteredMatches = sampleMatches.filter((match) => {
      return (
        (!preferences.petType || match.petType === preferences.petType) &&
        (!preferences.breed || match.breed.toLowerCase().includes(preferences.breed.toLowerCase())) &&
        (!preferences.age || match.age === preferences.age) &&
        (!preferences.gender || match.gender === preferences.gender) &&
        (!preferences.temperament || match.temperament === preferences.temperament) &&
        (!preferences.location || match.location.toLowerCase().includes(preferences.location.toLowerCase()))
      );
    });

    setMatches(filteredMatches);
  };

  return (
    <div className="pet-mate-finder-container">
      <header className="mate-finder-header">
        <h1>Find a Mate for Your Pet</h1>
        <p>Discover compatible mates for pet breeding near you!</p>
      </header>

      <section className="mate-finder-form">
        <h2>Enter Your Pet's Details</h2>
        <form onSubmit={handleFindMate}>
          <div className="form-group">
            <label>Pet Type</label>
            <select name="petType" value={preferences.petType} onChange={handleInputChange}>
              <option value="">Select</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
            </select>
          </div>
          <div className="form-group">
            <label>Breed</label>
            <input type="text" name="breed" value={preferences.breed} onChange={handleInputChange} placeholder="Enter breed" />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" value={preferences.age} onChange={handleInputChange} placeholder="Enter age" />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={preferences.gender} onChange={handleInputChange}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Temperament</label>
            <select name="temperament" value={preferences.temperament} onChange={handleInputChange}>
              <option value="">Select</option>
              <option value="Friendly">Friendly</option>
              <option value="Playful">Playful</option>
              <option value="Calm">Calm</option>
              <option value="Energetic">Energetic</option>
            </select>
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" value={preferences.location} onChange={handleInputChange} placeholder="Enter location" />
          </div>
          <button type="submit">Find Mate</button>
        </form>
      </section>

      <section className="mate-results">
        <h2>Potential Mates</h2>
        {matches.length > 0 ? (
          <ul className="matches-list">
            {matches.map((match, index) => (
              <li key={index} className="match-card">
                <h3>{match.name}</h3>
                <p><strong>Type:</strong> {match.petType}</p>
                <p><strong>Breed:</strong> {match.breed}</p>
                <p><strong>Age:</strong> {match.age}</p>
                <p><strong>Gender:</strong> {match.gender}</p>
                <p><strong>Temperament:</strong> {match.temperament}</p>
                <p><strong>Location:</strong> {match.location}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No matches found. Try refining your search!</p>
        )}
      </section>
    </div>
  );
};

export default Petfinder;
