import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './grooming.css';

const Grooming = () => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [formData, setFormData] = useState({
        serviceId: '',
        petType: '',
        clientName: '',
        clientContact: '',
        clientEmail: '',
        groomingDate: '',
    });
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:5000/groom');
                setServices(response.data);
            } catch (err) {
                console.error('Error fetching services:', err);
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
        service['service name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service['provider name'].toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedServices = filteredServices.sort((a, b) => {
        if (sortBy === 'name') return a['service name'].localeCompare(b['service name']);
        if (sortBy === 'location') return a.location.localeCompare(b.location);
        if (sortBy === 'provider') return a['provider name'].localeCompare(b['provider name']);
        return 0;
    });

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const openModal = (service) => {
        setSelectedService(service);
        setFormData({
            serviceId: service._id,
            petType: service['pet type'],
            clientName: '',
            clientContact: '',
            clientEmail: '',
            groomingDate: '',
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
            await axios.post('http://localhost:5000/book-grooming', formData);
            setMessage('Service booked successfully!');
            closeModal();
        } catch (error) {
            setMessage('Booking service failed. Please try again.');
            console.error('Error booking service:', error.response || error);
        }
    };

    return (
        <div className="grooming-container">
            <h1 className="gheading">Grooming Services</h1>

            <div className="gsearch-sort-container">
                <input
                    type="text"
                    placeholder="Search by name, location, provider..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="gsearch-bar"
                />
                <select value={sortBy} onChange={handleSort} className="gsort-select">
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="location">Location</option>
                    <option value="provider">Provider Name</option>
                </select>
            </div>

            <div className="gservices-list">
                {sortedServices.map((service) => (
                    <div
                        key={service._id}
                        className="gservice-card"
                        onClick={() => openModal(service)}
                    >
                        <h3 className="gservice-name">{service['service name']}</h3>
                            <p className="gservice-details">Pet Type: {service['pet type']}</p>
                            <p className="gservice-details">Provider: {service['provider name']}</p>
                            <p className="gservice-details">Contact: {service['provider contact']}</p>
                            <p className="gservice-details">Location: {service.location}</p>
                            <p className="gservice-details">Hours: {service['operation hours']}</p>
                            <p className="gprice">₹{service.price}</p>
                    </div>
                ))}
            </div>

            <div className="gpagination">
                {[...Array(Math.ceil(services.length / servicesPerPage))].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`gpage-button ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {isModalOpen && (
                <div className="gmodal">
                    <div className="gmodal-content">
                        <span className="gclose" onClick={closeModal}>&times;</span>
                        <form className="gbooking-form" onSubmit={handleSubmit}>
                            <h2>Book a Service</h2>
                            <input type="text" value={selectedService['service name']} readOnly />
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
                                name="groomingDate"
                                placeholder="Grooming Date"
                                value={formData.groomingDate}
                                onChange={handleChange}
                                required
                            />
                            <button type="submit">Book Service</button>
                        </form>
                        {message && <p className="gmessage">{message}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Grooming;
