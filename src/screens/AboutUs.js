import React from 'react'
import './about.css';
import Header from '../components/Header'
import Footer from '../components/Footer'

function AboutUs() {
    return (
        <div>
            <Header/>
            <main>
        <div class="container2">
            <h1>About Us</h1>
            <section>
                <p>We provide an approach to addressing the 
                    diverse needs of pet owners and animal care professionals. We provide a 
                    wide range of functionalities to streamline pet care and management, 
                    offering a comprehensive solution for managing various aspects of pet ownership. 
                    As pets share a beautiful bond with people’s lives, we care for providing efficient and 
                    effective management solutions to all pet Owners. We provide all the necessary
                    services such as appointment scheduling with veterians, trainers, groomers, pet shelters,
                    making available all the pet essentials including the pet toys, food, clothes and all necessary
                    supplies under one platform.
                </p>
            </section>
            
            <section>
                <h2>Our Mission</h2>
                <p>We thrive to enhance the quality of pet care, 
                    improve convenience for pet owners, and support the operational efficiency 
                    of veterinary clinics, pet shelters, and pet-related businesses. By integrating 
                    multiple functions such as appointment scheduling, grooming, training, competitions 
                    and events, pet shelters, and e-commerce for pet supplies into a single platform the 
                    system aims to address the demands of modern pet ownership.</p>
            </section>
            <section>
                <h3>Becoz every pet deserves a home.....</h3>
            </section>
        </div>
    </main>
      <Footer/>
      </div>
    );
  }
  
export default AboutUs;
  