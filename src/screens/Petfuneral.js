import React, { useState } from "react";
import "./petfuneral.css";

const Petfuneral = () => {
  const [memories, setMemories] = useState([]);
  const [newMemory, setNewMemory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [collapsed, setCollapsed] = useState({});

  const handleMemorySubmit = (e) => {
    e.preventDefault();
    if (newMemory.trim()) {
      const timestamp = new Date().toLocaleString();
      setMemories([...memories, { text: newMemory, time: timestamp }]);
      setNewMemory("");
    }
  };

  const toggleModal = (service) => {
    setSelectedService(service);
    setShowModal(!showModal);
  };

  const toggleCollapse = (index) => {
    setCollapsed({ ...collapsed, [index]: !collapsed[index] });
  };

  return (
    <div className="pet-funeral-container">
      <header className="funeral-header">
        <h1>Pet Funeral Management</h1>
        <p>Providing dignified services and support for your beloved pets.</p>
      </header>

      <section className="funeral-services">
        <h2>Funeral Services</h2>
        <div className="services-list">
          {["Cremation", "Burial", "Memorial Creation"].map((service, index) => (
            <div className="service-card" key={index}>
              <h3>{service}</h3>
              <p>{`Book a respectful ${service.toLowerCase()} service for your pet.`}</p>
              <button onClick={() => toggleModal(service)}>Book Now</button>
            </div>
          ))}
        </div>
      </section>

      <section className="share-memories">
        <h2>Share Memories</h2>
        <form onSubmit={handleMemorySubmit}>
          <textarea
            placeholder="Share a cherished memory of your pet..."
            value={newMemory}
            onChange={(e) => setNewMemory(e.target.value)}
            maxLength={200}
          ></textarea>
          <div className="memory-controls">
            <span>{200 - newMemory.length} characters remaining</span>
            <button type="submit">Submit</button>
          </div>
        </form>
        <ul className="memories-list">
          {memories.map((memory, index) => (
            <li key={index}>
              <p>{memory.text}</p>
              <small>{memory.time}</small>
            </li>
          ))}
        </ul>
      </section>

      <section className="support-resources">
        <h2>Support Resources</h2>
        <ul>
          {[
            { title: "Grief Counseling", details: "Talk to professionals for emotional support." },
            { title: "Support Groups", details: "Join communities sharing similar experiences." },
            { title: "Pet Memorial Products", details: "Find unique products to honor your pet." },
          ].map((resource, index) => (
            <li key={index}>
              <div className="resource-title" onClick={() => toggleCollapse(index)}>
                {resource.title}
                <span>{collapsed[index] ? "▲" : "▼"}</span>
              </div>
              {collapsed[index] && <p className="resource-details">{resource.details}</p>}
            </li>
          ))}
        </ul>
      </section>

      {showModal && (
        <div className="funmodal-overlay">
          <div className="funmodal">
            <h3>Book {selectedService}</h3>
            <p>Please provide details to book this service.</p>
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="text" placeholder="Pet's Name" required />
              <textarea placeholder="Additional Notes (optional)"></textarea>
              <button type="submit">Confirm Booking</button>
            </form>
            <button className="funclose-modal" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Petfuneral;
