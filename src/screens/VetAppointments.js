import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './vetapp.css';

const VetAppointments = () => {
  return (
    <div className="vet-page-container">
      <div className="vet-header">
        <h1>Vet Appointment Page</h1>
        <p>Choose from our available vets and book an appointment!</p>
      </div>
      <VetList />
    </div>
  );
};

const VetList = () => {
  const [vets, setVets] = useState([]);
  const [filteredVets, setFilteredVets] = useState([]);
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const vetsPerPage = 10;

  useEffect(() => {
    const fetchVets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/vets');
        setVets(response.data);
        setFilteredVets(response.data);
      } catch (error) {
        console.error('Error fetching vets:', error);
      }
    };

    fetchVets();
  }, []);

  useEffect(() => {
    let result = [...vets];

    if (search) {
      result = result.filter(
        (vet) =>
          vet['vet name'].toLowerCase().includes(search.toLowerCase()) ||
          vet.location.toLowerCase().includes(search.toLowerCase()) ||
          vet['speciality or domain'].toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortType === 'location') {
      result.sort((a, b) => a.location.localeCompare(b.location));
    } else if (sortType === 'time') {
      result.sort(
        (a, b) =>
          new Date(a['free slots for appointments'][0]) -
          new Date(b['free slots for appointments'][0])
      );
    }

    setFilteredVets(result);
  }, [search, sortType, vets]);

  const indexOfLastVet = currentPage * vetsPerPage;
  const indexOfFirstVet = indexOfLastVet - vetsPerPage;
  const currentVets = filteredVets.slice(indexOfFirstVet, indexOfLastVet);
  const totalPages = Math.ceil(filteredVets.length / vetsPerPage);

  return (
    <div className="vet-list-container">
      <div className="vetsearch-sort-container">
        <div className="vetsearch-bar">
          <span className="vetsearch-icon">&#128269;</span>
          <input
            type="text"
            placeholder="Search by name, place, or specialty"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          onChange={(e) => setSortType(e.target.value)}
          className="vetsort-dropdown"
        >
          <option value="">Sort By</option>
          <option value="location">Location</option>
          <option value="time">Time</option>
        </select>
      </div>
      <h2>Available Vets</h2>
      {currentVets.map((vet) => (
        <div key={vet._id} className="vet-card">
          <h3>{vet['vet name']}</h3>
          <p>
            <strong>Specialty:</strong> {vet['speciality or domain']}
          </p>
          <p>
            <strong>Location:</strong> {vet.location}
          </p>
          <p>
            <strong>Contact:</strong> {vet['contact details']}
          </p>
          <BookAppointment
            vetId={vet._id}
            freeSlots={vet['free slots for appointments']}
          />
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="vetpagination-container">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="vetpagination-button"
      >
        Previous
      </button>
      <span className="vetpagination-info">{`${currentPage} / ${totalPages}`}</span>
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="vetpagination-button"
      >
        Next
      </button>
    </div>
  );
};

const BookAppointment = ({ vetId, freeSlots }) => {
  const [name, setName] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/booked-slots/${vetId}`);
        setBookedSlots(response.data);
      } catch (error) {
        console.error('Error fetching booked slots:', error);
      }
    };

    fetchBookedSlots();
  }, [vetId]);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      setErrorMessage('Please select a slot.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      await axios.post('http://localhost:5000/book-slot', {
        vetId,
        name,
        contactDetails,
        selectedSlot,
      });

      setSuccessMessage('Appointment booked successfully!');
      setBookedSlots((prev) => [...prev, selectedSlot]);
      setSelectedSlot('');
      setName('');
      setContactDetails('');
    } catch (error) {
      console.error('Error booking appointment:', error);
      setErrorMessage('Booking failed. Please try again.');
    }
    setLoading(false);
  };

  const availableSlots = freeSlots
    .split(',')
    .filter((slot) => !bookedSlots.includes(slot));

  return (
    <form className='vetform' onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Contact Details"
        value={contactDetails}
        onChange={(e) => setContactDetails(e.target.value)}
        required
      />
      <div className="slot-container">
        <p>Select a Slot:</p>
        {availableSlots.map((slot, index) => (
          <button
            type="button"
            key={index}
            className={`slot-button ${selectedSlot === slot ? 'selected' : ''}`}
            onClick={() => handleSlotClick(slot)}
          >
            {slot}
          </button>
        ))}
        {availableSlots.length === 0 && <p>No slots available for this vet.</p>}
      </div>
      <button type="submit" disabled={loading || availableSlots.length === 0}>
        {loading ? 'Booking...' : 'Book Appointment'}
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
};

export default VetAppointments;
