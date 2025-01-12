import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [playdates, setPlaydates] = useState([]);  // New state for playdates
  const [gallery, setGallery] = useState([]);
  const navigate = useNavigate();

  // Get the token from local storage
  const token = localStorage.getItem('token');
  
  // Redirect to login if no token found
  if (!token) {
    navigate('/login');
  }

  // Fetching user data and activity data after login
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/appointments', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    const fetchPlaydates = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/playdates', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setPlaydates(data);
      } catch (error) {
        console.error('Error fetching playdates:', error);
      }
    };

    const fetchGallery = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/gallery', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setGallery(data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      }
    };

    // Call all fetch functions
    fetchUserData();
    fetchAppointments();
    fetchServices();
    fetchPlaydates();
    fetchGallery();
  }, [token]);

  // Navigate to different sections
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2>Pet Dashboard</h2>
        <ul>
          <li onClick={() => navigateTo("/")}>Home</li>
          <li onClick={() => navigateTo("/login")}>Login</li>
          <li onClick={() => navigateTo("/signup")}>Signup</li>
          <li onClick={() => navigateTo("/vets")}>Find Vets</li>
          <li onClick={() => navigateTo("/dashboard")}>Profile Dashboard</li>
          <li onClick={() => navigateTo("/funeral")}>Pet Funeral</li>
          <li onClick={() => navigateTo("/playdate")}>Find Playdate</li>
          <li onClick={() => navigateTo("/findmate")}>Find Mate</li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <h1>Welcome, {userData.name || "Pet Owner"}!</h1>
        </header>

        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-card">
            <img src={userData.profilePicture || "/default-avatar.png"} alt="Profile" />
            <h3>{userData.name || "Your Name"}</h3>
            <p>{userData.email || "your.email@example.com"}</p>
            <button>Update Profile</button>
          </div>
        </div>

        {/* Appointments Section */}
        <section>
          <h2>Your Appointments</h2>
          {appointments.length > 0 ? (
            <ul>
              {appointments.map((appointment) => (
                <li key={appointment.id}>
                  {appointment.date} - {appointment.service}
                </li>
              ))}
            </ul>
          ) : (
            <p>No appointments found.</p>
          )}
        </section>

        {/* Services Section */}
        <section>
          <h2>Your Services</h2>
          {services.length > 0 ? (
            <ul>
              {services.map((service) => (
                <li key={service.id}>
                  {service.name} - {service.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>No services found.</p>
          )}
        </section>

        {/* Playdates Section */}
        <section>
          <h2>Your Playdates</h2>
          {playdates.length > 0 ? (
            <ul>
              {playdates.map((playdate) => (
                <li key={playdate.id}>
                  {playdate.date} - {playdate.location}
                </li>
              ))}
            </ul>
          ) : (
            <p>No playdates found.</p>
          )}
        </section>

        {/* Gallery Section */}
        <section>
          <h2>Your Gallery</h2>
          {gallery.length > 0 ? (
            <div className="gallery">
              {gallery.map((image) => (
                <img key={image.id} src={image.url} alt="Gallery" />
              ))}
            </div>
          ) : (
            <p>No gallery images found.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
