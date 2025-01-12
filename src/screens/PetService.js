// import React from 'react';
// import PetServiceNav from '../components/PetServiceNav';
// import {servicesData, ServiceCategory} from '../components/Data';

// function PetService(){
//     return(
//         <div>
//            <PetServiceNav />
//            {servicesData.map((category,index) => (
//                 <ServiceCategory key={index} title={category.title} services={category.services}/>
//            ))} 
//         </div>
//     );
// }

// export default PetService;
import React from "react";
import { useNavigate } from "react-router-dom";
import "./services.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

const PetService = () => {
  const navigate = useNavigate();

  const services = [
    {
      name: "Vet Appointments",
      page: "/vet-appointments",
      image: "/images/checkup.jpg",
      description: "Book appointments with top veterinarians for your pet's health.",
    },
    {
      name: "Playdates",
      page: "/playdates",
      image: "/images/play.jpg",
      description: "Organize fun playdates and meet-ups for your furry friends.",
    },
    {
      name: "Mate Finder",
      page: "/matefinder",
      image: "/images/mate.jpg",
      description: "Find the perfect mate for your pet in a secure and friendly way.",
    },
    {
      name: "Grooming",
      page: "/grooming",
      image: "/images/grooming.jpg",
      description: "Pamper your pet with professional grooming services.",
    },
    {
      name: "Caretaking",
      page: "/caretaking",
      image: "/images/care.jpg",
      description: "Find reliable caretakers to look after your pet when you can't.",
    },
    {
      name: "Pet Funerals",
      page: "/petfunerals",
      image: "/images/petfun.webp",
      description: "Honor your beloved pets with compassionate funeral services.",
    },
    {
      name: "Pet Training",
      page: "/training",
      image: "/images/train.jpg",
      description: "Enhance your pet's behavior with professional training services.",
    },
  ];

  return (
    <div>
     <Header/>
    <div className="services-container">
      <header className="services-header">
        <h1>Explore Our Pet Services</h1>
        <p>Your one-stop destination for all your pet's needs!</p>
      </header>
      {services.map((service, index) => (
        <div
          key={index}
          className={`service-section ${
            index % 2 === 0 ? "section-light" : "section-dark"
          }`}
        >
          <div className="service-content">
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <button
              onClick={() => navigate(service.page)}
              className="service-button"
            >
              Explore {service.name}
            </button>
          </div>
          <div className="service-image-container">
            <img
              src={service.image}
              alt={service.name}
              className="service-image"
            />
          </div>
        </div>
      ))}
    </div>
    <Footer/>
    </div>
  );
};

export default PetService;
