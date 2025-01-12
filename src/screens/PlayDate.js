import React, { useState } from "react";
import "./playdate.css";

const PlayDate = () => {
  const [preferences, setPreferences] = useState({
    petType: "",
    breed: "",
    age: "",
    temperament: "",
    location: "",
  });

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handleMatch = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMatches([]);

    // Hardcoded match data
    const hardcodedMatches = [
      {
        name: "Buddy",
        petType: "Dog",
        breed: "Labrador",
        age: 3,
        temperament: "Friendly",
        location: "Park Avenue",
      },
      {
        name: "Kitty",
        petType: "Cat",
        breed: "Persian",
        age: 2,
        temperament: "Playful",
        location: "Elm Street",
      },
      {
        name: "Max",
        petType: "Dog",
        breed: "Beagle",
        age: 4,
        temperament: "Calm",
        location: "Oakwood",
      },
    ];

    // Filter matches based on preferences
    const filteredMatches = hardcodedMatches.filter((match) => {
      return (
        (!preferences.petType || match.petType === preferences.petType) &&
        (!preferences.breed || match.breed.toLowerCase().includes(preferences.breed.toLowerCase())) &&
        (!preferences.age || match.age <= parseInt(preferences.age)) &&
        (!preferences.temperament || match.temperament === preferences.temperament) &&
        (!preferences.location || match.location.toLowerCase().includes(preferences.location.toLowerCase()))
      );
    });

    // Simulate loading delay
    setTimeout(() => {
      setMatches(filteredMatches);
      setLoading(false);
      if (filteredMatches.length === 0) {
        setError("No matches found.");
      }
    }, 1000);
  };

  return (
    <div className="pet-playdate-container">
      <header className="playdate-header">
        <h1>Find a Play Date for Your Pet</h1>
        <p>Match your pet with compatible playmates nearby!</p>
      </header>

      <section className="playdate-form">
        <h2>Enter Your Pet's Details</h2>
        <form onSubmit={handleMatch}>
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
            <input
              type="text"
              name="breed"
              value={preferences.breed}
              onChange={handleInputChange}
              placeholder="Enter breed"
            />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={preferences.age}
              onChange={handleInputChange}
              placeholder="Enter age"
            />
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
            <input
              type="text"
              name="location"
              value={preferences.location}
              onChange={handleInputChange}
              placeholder="Enter location"
            />
          </div>
          <button type="submit">Find Matches</button>
        </form>
      </section>

      <section className="match-results">
        <h2>Matching Play Dates</h2>
        {loading && <p>Loading matches...</p>}
        {error && <p className="error">{error}</p>}
        {matches.length > 0 ? (
          <ul className="matches-list">
            {matches.map((match, index) => (
              <li key={index} className="match-card">
                <h3>{match.name}</h3>
                <p>
                  <strong>Type:</strong> {match.petType}
                </p>
                <p>
                  <strong>Breed:</strong> {match.breed}
                </p>
                <p>
                  <strong>Age:</strong> {match.age}
                </p>
                <p>
                  <strong>Temperament:</strong> {match.temperament}
                </p>
                <p>
                  <strong>Location:</strong> {match.location}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No matches found yet. Fill in your pet's details to find a match!</p>
        )}
      </section>
    </div>
  );
};

export default PlayDate;
