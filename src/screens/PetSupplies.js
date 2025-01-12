import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './supplies.css';
import HeaderSup from '../components/HeaderSup';
import Footer from '../components/Footer';
import { useNavigate, useLocation } from 'react-router-dom';

function PetSupplies() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getProducts');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Get the search query from the URL
  const searchQuery = new URLSearchParams(location.search).get('search') || '';

  // Filter products based on the search query
  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product['name of item'].toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [searchQuery, products]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex((item) => item._id === product._id);
    if (productIndex !== -1) {
      cart[productIndex].quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  // Function to render stars based on rating with support for half stars
  const renderStars = (rating) => {
    const maxStars = 5;
    const starsArray = [];

    for (let i = 0; i < maxStars; i++) {
      if (i < Math.floor(rating)) {
        starsArray.push(<span key={i} className="star filled">★</span>);
      } else if (i < rating) {
        starsArray.push(<span key={i} className="star half-filled">★</span>);
      } else {
        starsArray.push(<span key={i} className="star">☆</span>);
      }
    }
    return starsArray;
  };
  

  return (
    <div className='sup'>
      <HeaderSup />
      <div className="products-container">
        <h2>Pet Supplies</h2>
        <div className="products-grid">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div className="card" key={product._id}>
                <img
                  src={product.image}
                  alt={product['name of item']}
                  className="product-image"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                />
                <div className="card-body">
                  <h5 className="product-title">{product['name of item']}</h5>
                  <p className="product-description">{product.description}</p>
                <div className="rating">
                  {renderStars(product.rating)}
                </div>
                <p className="reviews"><b>Reviews:</b> {product.reviews}</p>
                <p className="price">₹{product.price.toFixed(2)}</p>
                  <button className="btn add-to-cart" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No products found for "{searchQuery}"</p>
          )}
        </div>

        {/* Pagination Controls */}
        {filteredProducts.length > itemsPerPage && (
          <div className="pagination">
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>&lt;</button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageClick(index + 1)}
                className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>&gt;</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default PetSupplies;
