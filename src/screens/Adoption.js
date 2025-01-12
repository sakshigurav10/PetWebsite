import React, { useEffect, useState } from 'react';
import './petadoption.css';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Adoption = () => {
    const [pets, setPets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [petsPerPage] = useState(6); // 6 pets per page, 2 per row, 3 rows
    const [showModal, setShowModal] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        petId: ''
    });

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch('http://localhost:5000/pets');
                const data = await response.json();
                console.log('Fetched pets:', data); // Debug log
                setPets(data);
            } catch (err) {
                console.error('Error fetching pets:', err);
            }
        };
        fetchPets();
    }, []);

    // Pagination logic
    const indexOfLastPet = currentPage * petsPerPage;
    const indexOfFirstPet = indexOfLastPet - petsPerPage;
    const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);

    const totalPages = Math.ceil(pets.length / petsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle pet card click to show the adoption form
    const handlePetClick = (pet) => {
        setSelectedPet(pet);
        setFormData({ ...formData, petId: pet._id });
        setShowModal(true);
    };

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/adopt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Adoption request submitted successfully!');
                setShowModal(false); // Close the modal after submission
            } else {
                alert('Failed to submit adoption request.');
            }
        } catch (err) {
            console.error('Error submitting adoption request:', err);
            alert('Error submitting adoption request.');
        }
    };

    return (
        <div>
            <Header/>
        <div className="petadoption">
            <h2>Adopt a Pet</h2>
            <div className="petadoption-container">
                {currentPets.length > 0 ? (
                    currentPets.map((pet) => (
                        <div
                            className="petadoption-card"
                            key={pet._id}
                            onClick={() => handlePetClick(pet)}
                        >
                            <img
                                src={pet['Pet image'] || 'https://via.placeholder.com/280x200?text=No+Image'}
                                alt={pet.Name}
                                className="petadoption-image"
                            />
                            <div className="petadoption-info">
                                <h3>{pet.Name || 'Unknown Name'}</h3>
                                <p><strong>Species:</strong> {pet.Species || 'Unknown'}</p>
                                <p><strong>Breed:</strong> {pet.Breed || 'Unknown'}</p>
                                <p><strong>Age:</strong> {pet.Age || 'Unknown'}</p>
                                <p><strong>Gender:</strong> {pet.Gender || 'Unknown'}</p>
                                <p><strong>Size:</strong> {pet.Size || 'Unknown'}</p>
                                <p><strong>Color:</strong> {pet.Color || 'Unknown'}</p>
                                <p><strong>Health Status:</strong> {pet['Health Status'] || 'Unknown'}</p>
                                <p><strong>Description:</strong> {pet.Description || 'No description available.'}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No pets available for adoption at the moment.</p>
                )}
            </div>

            {/* Pagination Controls */}
            {pets.length > 0 && (
                <div className="petpagination">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <span>{currentPage} / {totalPages}</span>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Adoption Modal */}
            {showModal && selectedPet && (
                <div className="petmodal-overlay">
                    <div className="petmodal">
                        <h3>Adopt {selectedPet.Name}</h3>
                        <form onSubmit={handleFormSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Your Phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                            <textarea
                                name="address"
                                placeholder="Your Address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                            <button type="submit">Submit Adoption Request</button>
                        </form>
                        <button onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
        <Footer/>
        </div>
    );
};

export default Adoption;
