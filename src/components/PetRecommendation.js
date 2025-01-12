import React, { useState } from 'react';
import { dogBreedInfo, catBreedInfo } from './breedInfo'; // Import breed info
import DogImageList from './DogImageList'; // Dog images component
import CatImageList from './CatImageList'; // Cat images component
import './PetRecommendation.css';

function PetRecommendation() {
  const [petType, setPetType] = useState('dog'); // Dog or cat
  const [purpose, setPurpose] = useState('Companion');
  const [dogImages, setDogImages] = useState([]);
  const [catImages, setCatImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedBreed, setSelectedBreed] = useState(''); // State for selected breed
  const [breedInfo, setBreedInfo] = useState(null); // Store breed info

  // Breed-to-purpose mapping for dog breeds
  const breedPurposeMapping = {
    Companion: ["bulldog", "poodle", "beagle", "maltese", "pug", "chihuahua"],
    Active: ["collie", "labrador", "retriever", "germanshepherd", "spaniel", "setter"],
    Guard: ["rottweiler", "germanshepherd", "doberman", "boxer", "malinois", "akita", "mastiff"],
    Working: ["husky", "collie", "retriever", "malamute", "dane", "samoyed"],
    Familyfriendly: ["retriever", "labrador", "beagle", "poodle", "pomeranian", "papillon"]
  };

  // Purpose-to-cat breeds mapping
  const catPurposeMapping = {
    Companion: ["persian", "bengal", "ragdoll", "siamese", "burmese", "sphynx"],
    Active: ["bengal", "van", "savannah", "abyssinian", "shorthair"],
    Familyfriendly: ["ragdoll", "burmese", "siberian", "abyssinian", "fold", "mainecoon"],
    Working: ["shorthair", "egyptianmau", "siberian", "manx", "angora"]
  };

  const handlePetTypeChange = (e) => {
    setPetType(e.target.value);
    setDogImages([]);  // Reset dog images when changing pet type
    setCatImages([]);  // Reset cat images when changing pet type
    setError('');
    setBreedInfo(null); // Reset breed info
  };

  const handlePurposeChange = (e) => {
    setPurpose(e.target.value);
  };

  const handleSearch = async () => {
    const breedList = petType === 'dog' ? breedPurposeMapping[purpose] : catPurposeMapping[purpose];
    if (!breedList || breedList.length === 0) return;

    setLoading(true);
    setError('');
    setDogImages([]);
    setCatImages([]);
    setBreedInfo(null); // Clear breed info

    try {
      const randomBreed = breedList[Math.floor(Math.random() * breedList.length)];
      setSelectedBreed(randomBreed);

      // Fetch breed info
      if (petType === 'dog') {
        setBreedInfo(dogBreedInfo[randomBreed]);
        const response = await fetch(`https://dog.ceo/api/breed/${randomBreed}/images/random/10`);
        const data = await response.json();
        setDogImages(data.message);
      } else if (petType === 'cat') {
        setBreedInfo(catBreedInfo[randomBreed]);
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${randomBreed}&limit=3`);
        const data = await response.json();
        setCatImages(data.map(item => item.url));
      }
    } catch (err) {
      console.error("API request failed:", err);
      setError('Error fetching images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Recommend">
      <h1>Find Your Compatible Pet....</h1>
      <div className="rimagecontainer">
        <label htmlFor="petType">Select Pet Type:</label>
        <select id="petType" value={petType} onChange={handlePetTypeChange}>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>
        <br />

        <label htmlFor="purpose">Select Purpose:</label>
        <select id="purpose" value={purpose} onChange={handlePurposeChange}>
          <option value="Companion">Companion</option>
          <option value="Active">Active</option>
          <option value="Guard">Guard</option>
          <option value="Working">Working</option>
          <option value="Familyfriendly">Family-friendly</option>
        </select>
        <br />

        <button onClick={handleSearch}>Search</button>
        <p>Breed: {selectedBreed}</p>
      </div>

      {/* Display breed info */}
      {breedInfo && (
        <div className="breed-info">
          <h3>{breedInfo.name}</h3>
          <p><strong>Description:</strong> {breedInfo.description}</p>
          <p><strong>Temperament:</strong> {breedInfo.temperament}</p>
          <p><strong>Size:</strong> {breedInfo.size}</p>
          <p><strong>Origin:</strong> {breedInfo.origin}</p>
        </div>
      )}

      {/* Loading/Error state */}
      {loading && <p className="loading-message">Loading...</p>}
        {error && <p className="error-message">{error}</p>}

      {/* Display dog or cat images based on the selected pet type */}
      {!loading && !error && (
        petType === 'dog' ? <DogImageList images={dogImages} /> : <CatImageList images={catImages} />
      )}
    </div>
  );
}

export default PetRecommendation;
