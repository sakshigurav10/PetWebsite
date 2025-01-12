import React from 'react'
import './serviceNav.css'

function PetServiceNav(){
    return(
        <div className="nav">
        <div className="leftbar">
            <h2>PettyPaw Services</h2>
            <a href="">Home</a>
            <div className="location">
                <input placeholder="Location"/>
                <button type="submit"><i className="fa-solid fa-location-dot"></i></button>
            </div>
            <div className="search">
                <input placeholder="Search by pets..."/>
                <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
        </div>
        <div className="rightbar">
            <i className="fa-solid fa-cart-shopping"></i>
            <i className="fa-solid fa-user-plus"></i>
        </div>
        </div>
    );
}

export default PetServiceNav;