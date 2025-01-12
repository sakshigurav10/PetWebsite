import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './events.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Payment from '../components/Payment';

function Events() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [locationQuery, setLocationQuery] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formData, setFormData] = useState({
        ownerName: '',
        petName: '',
        category: '',
        age: '',
        numberOfPets: '',
        phoneNumber: '',
        place: ''
    });

    const [showPayment, setShowPayment] = useState(false);

    // Fetch events from the backend
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getCompetitions');
            setEvents(response.data);
            setFilteredEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Filter and sort events
    useEffect(() => {
        let filtered = [...events];

        // Filter by location query
        if (locationQuery) {
            filtered = filtered.filter((event) =>
                event.location.toLowerCase().includes(locationQuery.toLowerCase())
            );
        }

        // Sort by selected criteria
        if (sortBy === 'date') {
            filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (sortBy === 'name') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'place') {
            filtered.sort((a, b) => a.location.localeCompare(b.location));
        }

        setFilteredEvents(filtered);
    }, [locationQuery, sortBy, events]);

    // Handle booking button click
    const handleBookNow = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const bookingDetails = { ...formData, eventId: selectedEvent._id };

        try {
            const response = await axios.post('http://localhost:5000/createBooking', bookingDetails, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 201) {
                setShowModal(false);
                alert('Booking confirmed! Proceeding to Payment.');
                setShowPayment(true);
            } else {
                alert('Booking failed. Please try again.');
            }
        } catch (error) {
            console.error('Error booking event:', error);
            alert('An error occurred while booking. Please try again.');
        }
    };

    if (showPayment) {
        return <Payment totalPrice={formData.numberOfPets * 500} onPaymentSuccess={() => setShowPayment(false)} />;
    }

    return (
        <div className="Events">
            <Header />

            <section className="banner">
                <h1>Pet Events in India - 2024</h1>
                <p>Find and book your spot at the top pet events in India!</p>
            </section>

            <div className="filter-sort">
                <div className="filter-input">
                    <input
                        type="text"
                        placeholder="Search by Location"
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                    />
                    <i className="icon-search"></i>
                </div>
                <div className="filter-dropdown">
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">Sort by</option>
                        <option value="date">Date</option>
                        <option value="name">Name</option>
                        <option value="place">Place</option>
                    </select>
                    <i className="icon-sort"></i>
                </div>
            </div>

            <section className="events">
                {filteredEvents.map((event) => (
                    <div className="event-card" key={event._id}>
                        <img src={`/${event.image}`} alt={event.name} />
                        <h2>{event.name}</h2>
                        <p>Date: {event.date}</p>
                        <p>Location: {event.location}</p>
                        <p>{event.description}</p>
                        <button onClick={() => handleBookNow(event)}>Book Now</button>
                    </div>
                ))}
            </section>

            {showModal && (
                <div className="modal" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Booking for {selectedEvent?.name}</h2>
                        <form onSubmit={handleFormSubmit}>
                            {['ownerName', 'petName', 'category', 'age', 'numberOfPets', 'phoneNumber', 'place'].map((field) => (
                                <input
                                    key={field}
                                    type={field === 'age' || field === 'numberOfPets' ? 'number' : 'text'}
                                    name={field}
                                    placeholder={field.replace(/([A-Z])/g, ' $1').trim()}
                                    required
                                    onChange={handleChange}
                                />
                            ))}
                            <button type="submit">Confirm Booking</button>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default Events;
