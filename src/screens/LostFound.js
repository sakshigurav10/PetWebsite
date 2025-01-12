import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './lostfound.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function LostFound() {
    const [lostPets, setLostPets] = useState([]);
    const [filteredPets, setFilteredPets] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const petsPerPage = 12;

    // Fetch lost pet data from the backend
    const fetchLostPets = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getLostPets');
            setLostPets(response.data);
            setFilteredPets(response.data);
        } catch (error) {
            console.error('Error fetching lost pets:', error);
        }
    };

    useEffect(() => {
        fetchLostPets();
    }, []);

    // Handle search functionality
    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
        const filtered = lostPets.filter((pet) =>
            pet["Pet name"].toLowerCase().includes(e.target.value.toLowerCase()) ||
            pet.LastSeenLocation.toLowerCase().includes(e.target.value.toLowerCase()) ||
            pet.Pet_type.toLowerCase().includes(e.target.value.toLowerCase()) ||
            pet.Breed.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredPets(filtered);
        setCurrentPage(1); // Reset to first page after search
    };

    // Handle sorting functionality
    const handleSort = (e) => {
        const option = e.target.value;
        setSortOption(option);
        const sortedPets = [...filteredPets].sort((a, b) => {
            if (option === 'name') return a["Pet name"].localeCompare(b["Pet name"]);
            if (option === 'date') return new Date(b.DateLost) - new Date(a.DateLost);
            if (option === 'status') return a.Status.localeCompare(b.Status);
            return 0;
        });
        setFilteredPets(sortedPets);
    };

    // Pagination logic
    const indexOfLastPet = currentPage * petsPerPage;
    const indexOfFirstPet = indexOfLastPet - petsPerPage;
    const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet);

    const totalPages = Math.ceil(filteredPets.length / petsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Header />

            {/* Banner Section */}
            <section className="lost-found-banner">
                <h1>Lost & Found Pets</h1>
                <p>Find your lost pet or report a found pet here.</p>
            </section>

            {/* Search and Sort Section */}
            <div className="search-sort-container">
                <input
                    type="text"
                    placeholder="Search pets by name, location, type..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-bar"
                />
                <select value={sortOption} onChange={handleSort} className="sort-dropdown">
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="date">Date Lost</option>
                    <option value="status">Status</option>
                </select>
            </div>

            {/* Lost & Found Cards Section */}
            <section className="lost-found-container">
                {currentPets.length === 0 ? (
                    <p>No lost pets found.</p>
                ) : (
                    currentPets.map(pet => (
                        <div key={pet._id} className="pet-card">
                            <h2>{pet["Pet name"]}</h2>
                            <p><strong>Type:</strong> {pet.Pet_type}</p>
                            <p><strong>Breed:</strong> {pet.Breed}</p>
                            <p><strong>Owner's Name:</strong> {pet.Owner_details.Name}</p>
                            <p><strong>Owner's Contact:</strong> {pet.Owner_details.Contact_no}</p>
                            <p><strong>Address:</strong> {pet.Owner_details.Address}</p>
                            <p><strong>Date Lost:</strong> {pet.DateLost}</p>
                            <p><strong>Last Seen Location:</strong> {pet.LastSeenLocation}</p>
                            <p><strong>Status:</strong> {pet.Status}</p>
                            {pet.Status === 'Lost' && (
                                <button onClick={() => alert(`Mark ${pet["Pet name"]} as found!`)}>Mark as Found</button>
                            )}
                        </div>
                    ))
                )}
            </section>

            {/* Pagination Section */}
            <div className="lostpagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <Footer />
        </div>
    );
}

export default LostFound;
