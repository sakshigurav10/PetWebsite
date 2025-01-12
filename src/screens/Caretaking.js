import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './caretaking.css';

const Caretaking = () => {
    // State hooks
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [formData, setFormData] = useState({
        petType: '',
        clientName: '',
        clientContact: '',
        clientEmail: '',
        caretakingDate: '',
    });
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetching services from backend API
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:5000/caretaking');
                setServices(response.data);
            } catch (err) {
                console.error('Error fetching services:', err);
            }
        };
        fetchServices();
    }, []);

    // Search and sort handlers
    const handleSearch = (e) => setSearchTerm(e.target.value);
    const handleSort = (e) => setSortBy(e.target.value);

    // Pagination logic
    const servicesPerPage = 9;
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = services.slice(indexOfFirstService, indexOfLastService);

    // Filtering services based on search term
    const filteredServices = currentServices.filter((service) =>
        (service['careservice name'] && service['careservice name'].toLowerCase().includes(searchTerm.toLowerCase())) ||
        (service.location && service.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (service['caretakers name'] && service['caretakers name'].toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    // Sorting services
    const sortedServices = filteredServices.sort((a, b) => {
        if (sortBy === 'name') return a['careservice name'].localeCompare(b['careservice name']);
        if (sortBy === 'location') return a.location.localeCompare(b.location);
        if (sortBy === 'caretaker') return a['caretakers name'].localeCompare(b['caretakers name']);
        return 0;
    });

    // Pagination handler
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Modal open/close handlers
    const openModal = (service) => {
        setSelectedService(service);
        setFormData({
            petType: service['pet type'],
            clientName: '',
            clientContact: '',
            clientEmail: '',
            caretakingDate: '',
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedService(null);
        setIsModalOpen(false);
        setMessage('');
    };

    // Form input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Form submission handler for booking caretaking service
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/book-caretaking', formData);
            setMessage('Service booked successfully!');
            closeModal();
        } catch (error) {
            setMessage('Booking service failed. Please try again.');
            console.error('Error booking service:', error.response || error);
        }
    };

    return (
        <div className="caretaking-container">
            <h1 className="cheading">Caretaking Services</h1>

            <div className="csearch-sort-container">
                <input
                    type="text"
                    placeholder="Search by name, location, provider..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="csearch-bar"
                />
                <select value={sortBy} onChange={handleSort} className="csort-select">
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="location">Location</option>
                    <option value="caretaker">Provider Name</option>
                </select>
            </div>

            <div className="cservices-list">
                {sortedServices.map((service) => (
                    <div
                        key={service._id}
                        className="cservice-card"
                        onClick={() => openModal(service)}
                    >
                        <h3 className="cservice-name">{service['careservice name']}</h3>
                        <p className="cservice-details">Pet Type: {service['pet type']}</p>
                        <p className="cservice-details">Caretaker: {service['caretakers name']}</p>
                        <p className="cservice-details">Contact: {service.contact || 'N/A'}</p>
                        <p className="cservice-details">Location: {service.location}</p>
                        <p className="cservice-details">Hours: {service['operation hours']}</p>
                        <p className="cprice">₹{service.price}</p>
                    </div>
                ))}
            </div>

            <div className="cpagination">
                {[...Array(Math.ceil(services.length / servicesPerPage))].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`cpage-button ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {isModalOpen && (
                <div className="cmodal">
                    <div className="cmodal-content">
                        <span className="cclose" onClick={closeModal}>&times;</span>
                        <form className="cbooking-form" onSubmit={handleSubmit}>
                            <h2>Book a Service</h2>
                            {/* Ensure the service name is not empty */}
                            <input type="text" value={selectedService ? selectedService['careservice name'] : ''} readOnly />
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
                                type="email"
                                name="clientEmail"
                                placeholder="Your Email"
                                value={formData.clientEmail}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="date"
                                name="caretakingDate"
                                placeholder="Caretaking Date"
                                value={formData.caretakingDate}
                                onChange={handleChange}
                                required
                            />
                            <button type="submit">Book Service</button>
                        </form>
                        {message && <p className="cmessage">{message}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Caretaking;
