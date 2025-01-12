import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Adoption from '../components/Adoption';
import Info from '../components/Info';
import img1 from '../images/serv.jpg';
import img2 from '../images/supply.avif';
import img3 from '../images/compete.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Homepage.css';

function Homepage() {
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [newReview, setNewReview] = useState({
        name: '',
        review: '',
        stars: '',
        img: '',
        occupation: ''
    });

    useEffect(() => {
        fetchReviews();
    }, [page]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/getReviews?page=${page}&limit=3`);
            setReviews(response.data.reviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleNext = () => setPage(page + 1);
    const handlePrev = () => setPage(page > 1 ? page - 1 : 1);

    const handleAddReview = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/addReview', newReview);
            setNewReview({ name: '', review: '', stars: '', img: '', occupation: '' });
            fetchReviews();
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className="imageSlider"></div>

            {/* Pet Recommendation Section */}
            <div className="pet-recommendation-section">
                <div className="container">
                    <h2>Find Your Perfect Pet!</h2>
                    <p>Not sure which pet suits you best? Let our pet recommendation system help you find the perfect companion based on your preferences.</p>
                    <Link to="/recommendationsystem" className="btn btn-primary">Start Recommendation</Link>
                </div>
            </div>

            <Adoption />

            {/* Lost & Found Section */}
            <div className="lost-found-section">
                <h2>LOST & FOUND PETS</h2>
                <p>Lost your pet or found one? Browse or report lost pets here.</p>
                <Link to="/lost" className="lost-found-link">View Lost Pets</Link>
            </div>

            <div className="link-section">
                <Link to='/service' className="link-card">
                    <img src={img1} alt="Pet Service" className="link-card-image" />
                    <div className="link-card-info">
                        <h3>Pet Service</h3>
                        <p>Find out about various pet services including grooming, training, and more.</p>
                    </div>
                </Link>
                <Link to='/supplies' className="link-card">
                    <img src={img2} alt="Pet Supplies" className="link-card-image" />
                    <div className="link-card-info">
                        <h3>Pet Supplies</h3>
                        <p>Explore a wide range of pet supplies from food to toys and accessories.</p>
                    </div>
                </Link>
                <Link to='/events' className="link-card">
                    <img src={img3} alt="Events" className="link-card-image" />
                    <div className="link-card-info">
                        <h3>Events & Competitions</h3>
                        <p>Check out upcoming events and activities for pets and pet lovers.</p>
                    </div>
                </Link>
            </div>

            <Info />

            <div className="review_sec">
                <div className="container">
                    <div className="section">
                        <h2>WHAT OUR CLIENTS SAY</h2>
                    </div>

                    <div className="content">
                        <div className="slider">
                            <div className="prev" onClick={handlePrev}>
                                <i className="fa-solid fa-chevron-left"></i>
                            </div>

                            <div className="review-container">
                                {reviews.length > 0 ? (
                                    reviews.map((review) => (
                                        <div className="item" key={review._id}>
                                            <img 
                                                src={`/${review.img}`} 
                                                alt={review.name} 
                                            />
                                            <div className="textbox">
                                                <h3>{review.name}</h3>
                                                <span className="job">{review.occupation}</span>
                                            </div>
                                            <p>{review.review}</p>
                                            <div className="rating">
                                                {[...Array(review.stars)].map((_, i) => (
                                                    <i key={i} className="fa-solid fa-star"></i>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No reviews available.</p>
                                )}
                            </div>

                            <div className="next" onClick={handleNext}>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="add-review-section">
                    <h2>Add Your Review</h2>
                    <form className="add-review-form" onSubmit={handleAddReview}>
                        <input type="text" placeholder="Name" value={newReview.name} onChange={(e) => setNewReview({ ...newReview, name: e.target.value })} required />
                        <input type="text" placeholder="Occupation" value={newReview.occupation} onChange={(e) => setNewReview({ ...newReview, occupation: e.target.value })} required />
                        <textarea placeholder="Your Review" value={newReview.review} onChange={(e) => setNewReview({ ...newReview, review: e.target.value })} required></textarea>
                        <input type="number" placeholder="Rating (1-5)" min="1" max="5" value={newReview.stars} onChange={(e) => setNewReview({ ...newReview, stars: e.target.value })} required />
                        <input type="text" placeholder="Image URL" value={newReview.img} onChange={(e) => setNewReview({ ...newReview, img: e.target.value })} />
                        <button type="submit">Submit Review</button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Homepage;
