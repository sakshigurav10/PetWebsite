import React from 'react'
import './data.css'

export const servicesData = [
    {
      title: 'Veterinary Care',
      services: [ 
        { title: 'Routine check-ups', imageUrl: 'images/checkup.jpg' },
        { title: 'Vaccinations', imageUrl: 'images/vaccine.jpg' },
        { title: 'Spaying/neutering', imageUrl: 'images/neuter.jpeg' },
        { title: 'Dental care', imageUrl: 'images/dental.jpeg' },
        { title: 'Surgery', imageUrl: 'images/surgery.jpg' },
        { title: 'Emergency care', imageUrl: 'images/care.jpg' },
        { title: 'Exotic pet care', imageUrl: 'images/exotic.jpeg' },
      ],
    },  
    { 
      title: 'Grooming',     
      services: [ 
        
        { title: 'Bathing', imageUrl: 'images/checkup.jpg' },
        { title: 'Haircuts and trims (cats, dogs)', imageUrl: 'images/vaccine.jpg' },
        { title: 'Nail trimming (all pets)', imageUrl: 'images/neuter.jpeg' },
        { title: 'Ear cleaning', imageUrl: 'images/dental.jpeg' },
        { title: 'Flea and tick treatments', imageUrl: 'images/surgery.jpg' },
        { title: 'Feather grooming (birds)', imageUrl: 'images/care.jpg' },  
      ],
    },
    {
      title: 'Training',
      services: [   
        { title: 'Obedience training (dogs)', imageUrl: 'images/checkup.jpg' },
        { title: 'Behavioral training (cats, dogs)', imageUrl: 'images/vaccine.jpg' },
        { title: 'Socialization classes (dogs)', imageUrl: 'images/neuter.jpeg' },
        { title: 'Specialty training (e.g., agility, service dogs)', imageUrl: 'images/dental.jpeg' },
        { title: 'Trick training (birds)', imageUrl: 'images/surgery.jpg' },
      ], 
    },
    {
       title: 'Boarding and Daycare',
       services: [
        { title: 'Overnight boarding (cats, dogs)', imageUrl: 'images/checkup.jpg' },
        { title: 'Dog daycare', imageUrl: 'images/vaccine.jpg' },
        { title: 'Cat boarding', imageUrl: 'images/neuter.jpeg' },
        { title: 'Pet sitting (rabbits, guinea pigs, hamsters, birds)', imageUrl: 'images/surgery.jpg' },
       ], 
    },
    {
       title: 'Nutrition and Feeding',
       services: [ 
        { title: 'Special diet planning (all pets)', imageUrl: 'images/checkup.jpg' },
        { title: 'Pet food delivery', imageUrl: 'images/vaccine.jpg' },
        { title: 'Weight management programs (cats, dogs)', imageUrl: 'images/neuter.jpeg' },
        { title: 'Specialty diets (rabbits, guinea pigs, hamsters, birds)', imageUrl: 'images/surgery.jpg' },
       ],
    },
    {
       title: 'Exercise and Play',  
       services: [
        { title: 'Dog walking', imageUrl: 'images/checkup.jpg' },
        { title: 'Playgroups (dogs)', imageUrl: 'images/vaccine.jpg' },
        { title: 'Pet parks', imageUrl: 'images/neuter.jpeg' },
        { title: 'Enrichment activities (rabbits, guinea pigs, hamsters, birds)', imageUrl: 'images/surgery.jpg' },
       ], 
    }
  ];

export const Card = ({imageUrl,title}) => (
    <div className="card"> 
        <img src={imageUrl} alt={title}/>
        <p>{title}</p>
    </div>
);

export const ServiceCategory = ({title,services}) => (         
    <div className="service_category">  
        <h2>{title}</h2>
        <div className="card_container">
            {services.map((service,index) => ( 
                <Card key={index} imageUrl={service.imageUrl} title={service.title} />
            ))}
        </div>
    </div>
);






