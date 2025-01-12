import React, { useState } from 'react';
import axios from 'axios';
import './contact.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ContactUs() {
    // State for form input fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = {
            name,
            email,
            subject,
            message,
        };

        try {
            // Send data to the backend (make sure the backend is accessible at the correct URL)
            const response = await axios.post('http://localhost:5000/contact', formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            alert('Message sent successfully!');
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            alert('There was an error sending your message. Please try again later.');
        }
    };

    return (
        <div>
            <Header />
            <section className="contact-us">
                <div className="container">
                    <div className="heading">
                        <h1>Contact Us</h1>
                        <i className="fa-solid fa-phone"></i>
                    </div>
                    <div className="contact-info">
                        <div className="info-item">
                            <h3>Phone</h3>
                            <p>+91 8050480504</p>
                        </div>
                        <div className="info-item">
                            <h3>Email</h3>
                            <p><a href="mailto:pawfect@gmail.com">pawfect@gmail.com</a></p>
                        </div>
                        <div className="info-item">
                            <h3>Address</h3>
                            <p>124, XYZ Lane, Pune, Maharashtra, India</p>
                        </div>
                    </div>
                    <div className="contact-form">
                        <h2>Send Us a Message</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <label htmlFor="subject">Subject:</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />

                            <label htmlFor="message">Message:</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            ></textarea>

                            <button type="submit" className="but">Submit</button>
                        </form>
                    </div>
                    <div className="business-hours">
                        <h3>Business Hours</h3>
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                    </div>
                    <div className="social-media">
                        <h3>Follow Us</h3>
                        <a href="#"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#"><i className="fa-brands fa-facebook"></i></a>
                        <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
                        <a href="#"><i className="fa-brands fa-youtube"></i></a>
                    </div>
                    <div className="map">
                        <h3>Our Location</h3>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=..."
                            width="600"
                            height="450"
                            frameBorder="0"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            aria-hidden="false"
                            tabIndex="0"
                        ></iframe>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default ContactUs;

