import React, { useEffect, useState } from 'react';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if a token exists in localStorage to determine login state
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="left_header">
                <h2><i className="fa-solid fa-paw"></i>PettyPaws</h2>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
                <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div className="right_header">
                <nav>
                    <ul className="navigation">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/aboutus">About Us</Link></li>
                        <li><Link to="/contactus">Contact Us</Link></li>
                        <li><Link to="/petguidelines">Info</Link></li>
                        <li><Link to="/animalwelfare"><button className="donate-button">DONATE <i className="fa-solid fa-heart"></i></button></Link></li>
                        <li>
                            {isLoggedIn ? (
                                <>
                                    <Link to="/profile"><i className="fa-solid fa-circle-user"></i> Profile</Link>
                                    <button onClick={handleLogout} className="logout-button">Logout</button>
                                </>
                            ) : (
                                <Link to="/login"><i className="fa-solid fa-circle-user"></i> Login</Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
