import React from 'react'
import './footer.css';
import img1 from '../images/gplaybadge1.png';
import img2 from '../images/appstorebadge1.png';

function Footer(){
    return (
        <div>
    <footer className="footer">
        <div className="top">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="heading">Contact Us</div>
                        <ul>
                            <li>+91 8050480504</li>
                            <li><a href="#">pawfect@gmail.com</a></li>
                            <li>124, XYZ Lane, Pune, Maharashtra, India</li>
                        </ul>
                        <br/><br/>
                        <div className="heading">Download Our App</div>
                        <div className="app-logos">
                            <a href="#"><img src={img1} alt="Google Play"/></a>
                            <a href="#"><img src={img2} alt="App Store"/></a>
                        </div>
                    </div>
                    <div className="col">
                        <div className="heading">Our Services</div>
                        <ul>
                            <li><a href="">Pet Adoption</a></li>
                            <li><a href="">Pet Grooming</a></li>
                            <li><a href="">CareTakers</a></li>
                            <li><a href="">Vet Appoinments</a></li>
                            <li><a href="">Pet Training</a></li>
                            <li><a href="">Pet Boarding</a></li>
                            <li><a href="">Competitions & Events</a></li>
                            <li><a href="">Donations</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <div className="heading">Links</div>
                        <ul>
                            <li><a href="">About Us</a></li>
                            <li><a href="">Terms & Conditions</a></li>
                            <li><a href="">FAQs</a></li>
                            <li><a href="">Join Us</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <div className="heading">Follow Us</div>
                        <div className="socialIcon">
                            <a href=""><i className="fa-brands fa-instagram"></i></a>
                            <a href=""><i className="fa-brands fa-facebook"></i></a>
                            <a href=""><i className="fa-brands fa-x-twitter"></i></a>
                            <a href=""><i className="fa-brands fa-youtube"></i></a>
                        </div>
                        <div className="left_header">
                            <h2><i className="fa-solid fa-paw"></i>PettyPaws</h2>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
        <div className="bottom">
            <div className="copyright">
                <hr/>
                <p>2024 All rights reserved | Made by Us </p>
            </div>
        </div>
    </footer>
        </div>
    );
}

export default Footer;