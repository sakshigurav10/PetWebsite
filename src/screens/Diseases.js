import React, { useState, useEffect } from 'react';
import './diseases.css';
import Footer from '../components/Footer';
import Header from '../components/Header';

// Import the JSON data
import diseaseData from './new_disease.json';  // Assuming diseases.json is in the same folder as App.js

function Diseases() {
  const [petType, setPetType] = useState('');
  const [inputSymptoms, setInputSymptoms] = useState('');
  const [diseases, setDiseases] = useState([]);
  const [diseaseSuggestions, setDiseaseSuggestions] = useState([]);

  // Set diseases data when the component mounts
  useEffect(() => {
    setDiseases(diseaseData);  // Load disease data from the JSON file
  }, []);

  const handlePetTypeChange = (type) => {
    setPetType(type);
  };

  const handleInputChange = (event) => {
    setInputSymptoms(event.target.value);
  };

  const handleDiagnose = () => {
    if (!petType) {
      alert("Please select a pet type (Dog or Cat).");
      return;
    }

    if (!inputSymptoms.trim()) {
      alert("Please enter at least one symptom.");
      return;
    }

    // Split the input symptoms into an array of symptoms
    const symptomsArray = inputSymptoms
      .split(',')  // Split by commas
      .map(symptom => symptom.trim().toLowerCase());  // Trim whitespace and convert to lowercase

    // Filter diseases based on the selected pet type
    const filteredDiseases = diseases.filter((disease) => disease.petType.toLowerCase() === petType.toLowerCase());

    // Find matching diseases based on symptom overlap
    const matchingDiseases = filteredDiseases
      .map((disease) => {
        const matchingSymptoms = symptomsArray.filter((symptom) =>
          disease.symptoms.map(s => s.toLowerCase()).includes(symptom)
        );
        return { disease, matchingSymptoms: matchingSymptoms.length };
      })
      .filter(disease => disease.matchingSymptoms === symptomsArray.length)  // Only diseases that match all symptoms
      .sort((a, b) => b.matchingSymptoms - a.matchingSymptoms);  // Sort by number of matching symptoms

    // If no matching diseases are found, try using the last symptom
    if (matchingDiseases.length === 0) {
      const lastSymptom = symptomsArray[symptomsArray.length - 1];
      const newMatchingDiseases = filteredDiseases
        .map((disease) => {
          const matchingSymptoms = disease.symptoms.filter(s => s.toLowerCase() === lastSymptom);
          return { disease, matchingSymptoms: matchingSymptoms.length };
        })
        .filter(disease => disease.matchingSymptoms > 0)  // Diseases that match the last symptom
        .sort((a, b) => b.matchingSymptoms - a.matchingSymptoms);  // Sort by number of matching symptoms

      if (newMatchingDiseases.length > 0) {
        setDiseaseSuggestions(newMatchingDiseases);
      } else {
        setDiseaseSuggestions([{ disease: "No matching disease found.", treatment: "Consult a veterinarian for a proper diagnosis." }]);
      }
    } else {
      setDiseaseSuggestions(matchingDiseases);
    }
  };

  return (
    <div>
    <Header/>
    <div className="Disease">
      <h1>Disease Diagnosis</h1>

      {/* Pet Type Selection with Buttons */}
      <div>
        <h2>Select Pet Type</h2>
        <div className="pet-type-buttons">
          <button onClick={() => handlePetTypeChange('dog')} disabled={petType === 'dog'}>
            Dog
          </button>
          <button onClick={() => handlePetTypeChange('cat')} disabled={petType === 'cat'}>
            Cat
          </button>
        </div>
      </div>

      {/* Symptoms Input */}
      <div>
        <h2>Enter Symptoms</h2>
        <textarea
          value={inputSymptoms}
          onChange={handleInputChange}
          placeholder="Enter symptoms separated by commas (e.g., vomiting, diarrhea, fever)"
          rows="4"
          cols="50"
        />

        {/* Button Container */}
        <div className="button-container">
          <button onClick={handleDiagnose}>Diagnose Disease</button>
        </div>
      </div>

      {/* Display Disease Suggestions */}
      {diseaseSuggestions.length > 0 && (
        <div>
          <h2>Diagnosis Suggestions</h2>
          {diseaseSuggestions.map((suggestion, index) => (
            <div key={index} className="disease-suggestion">
              {suggestion.disease === "No matching disease found." ? (
                <p>{suggestion.disease}</p>
              ) : (
                <>
                  <h3>{suggestion.disease.disease}</h3>

                  {/* Disease Description */}
                  <p><strong>Description:</strong> {suggestion.disease.description}</p>

                  {/* Disease Cause */}
                  <p><strong>Cause:</strong> {suggestion.disease.cause}</p>

                  {/* Symptoms */}
                  <p><strong>Symptoms:</strong> {suggestion.disease.symptoms.join(', ')}</p>

                  {/* Treatment */}
                  <p><strong>Treatment:</strong> {suggestion.disease.treatment}</p>

                  {/* Care */}
                  <p><strong>Care:</strong> {suggestion.disease.care}</p>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Consult a Vet Tip */}
      <div className="vet-tip">
        <p>Tip: Consult your veterinarian for a proper diagnosis and treatment plan.</p>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default Diseases;