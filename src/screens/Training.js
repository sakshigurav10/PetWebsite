import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './training.css';

const Training = () => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [formData, setFormData] = useState({
        trainingType: '',
        petType: '',
        clientName: '',
        clientContact: '',
        trainingDate: '',
    });
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:5000/training');
                setServices(response.data);
            } catch (err) {
                console.error('Error fetching training services:', err);  // Improved error logging
                if (err.response) {
                    // If the error contains a response, log the status
                    console.error('Error response status:', err.response.status);
                } else if (err.request) {
                    // If the error has no response but a request was made
                    console.error('No response received:', err.request);
                } else {
                    // For other types of errors
                    console.error('Error message:', err.message);
                }
            }
        };
        fetchServices();
    }, []);

    const handleSearch = (e) => setSearchTerm(e.target.value);
    const handleSort = (e) => setSortBy(e.target.value);

    const servicesPerPage = 9;
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = services.slice(indexOfFirstService, indexOfLastService);

    const filteredServices = currentServices.filter((service) =>
        (service['Training Type'] && service['Training Type'].toLowerCase().includes(searchTerm.toLowerCase())) ||
        (service[' Indian Trainer name'] && service[' Indian Trainer name'].toLowerCase().includes(searchTerm.toLowerCase()))
    );
    

    const sortedServices = filteredServices.sort((a, b) => {
        if (sortBy === 'name') {
            const trainerA = a[' Indian Trainer name'] || '';
            const trainerB = b[' Indian Trainer name'] || '';
            return trainerA.localeCompare(trainerB);
        }
        if (sortBy === 'type') {
            const typeA = a['Training Type'] || '';
            const typeB = b['Training Type'] || '';
            return typeA.localeCompare(typeB);
        }
        return 0;
    });

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const openModal = (service) => {
        setSelectedService(service);
        setFormData({
            trainingType: service['Training Type'],
            petType: service['Dog/Cat'],
            clientName: '',
            clientContact: '',
            trainingDate: '',
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedService(null);
        setIsModalOpen(false);
        setMessage('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/book-training', formData);
            setMessage('Training session booked successfully!');
            closeModal();
        } catch (error) {
            setMessage('Booking session failed. Please try again.');
            console.error('Error booking session:', error.response || error);
        }
    };

    return (
        <div className="training-container">
            <h1 className="training-heading">Training Services</h1>

            <div className="tsearch-sort-container">
                <input
                    type="text"
                    placeholder="Search by training type, trainer..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="tsearch-bar"
                />
                <select value={sortBy} onChange={handleSort} className="tsort-select">
                    <option value="">Sort By</option>
                    <option value="name">Trainer Name</option>
                    <option value="type">Training Type</option>
                </select>
            </div>

            <div className="tservices-list">
                {sortedServices.map((service) => (
                    <div
                        key={service._id}
                        className="tservice-card"
                        onClick={() => openModal(service)}
                    >
                        <h3>{service['Training Type']}</h3>
                        <p>Pet Type: {service['Dog/Cat']}</p>
                        <p>Trainer: {service[' Indian Trainer name'] || 'Not Available'}</p>
                        <p>Contact: {service['Indian Trainer Contact']}</p>
                        <p>Fees: ₹{service['Fees in Rupees']}</p>
                    </div>
                ))}
            </div>

            <div className="tpagination">
                {[...Array(Math.ceil(services.length / servicesPerPage))].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`tpage-button ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {isModalOpen && (
                <div className="tmodal">
                    <div className="tmodal-content">
                        <span className="tclose" onClick={closeModal}>&times;</span>
                        <form className="tbooking-form" onSubmit={handleSubmit}>
                            <h2>Book a Training Session</h2>
                            <input type="text" value={selectedService['Training Type']} readOnly />
                            <input
                                type="text"
                                name="clientName"
                                placeholder="Your Name"
                                value={formData.clientName}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="clientContact"
                                placeholder="Your Contact"
                                value={formData.clientContact}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="date"
                                name="trainingDate"
                                placeholder="Training Date"
                                value={formData.trainingDate}
                                onChange={handleChange}
                                required
                            />
                            <button type="submit">Book Session</button>
                        </form>
                        {message && <p className="tmessage">{message}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Training;
