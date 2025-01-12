import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './screens/Homepage';
import ContactUs from './screens/ContactUs';
import AboutUs from './screens/AboutUs';
import './App.css';
import PetService from './screens/PetService';
import PetSupplies from './screens/PetSupplies';
import Events from './screens/Events';
import LostFound from './screens/LostFound';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Diseases from './screens/Diseases';
import PetCareGuidelines from './components/PetCareGuidelines';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import AnimalWelfare from './components/AnimalWelfare';
import ChatBot from './components/Bot';
import Petfuneral from './screens/Petfuneral';
import Petfinder from './screens/Petfinder';
import PlayDate from './screens/PlayDate';
import VetAppointments from './screens/VetAppointments';
import Adoption from './screens/Adoption';
import Training from './screens/Training';
import Grooming from './screens/Grooming';
import Caretaking from './screens/Caretaking';
import PetRecommendation from './components/PetRecommendation';
import Dashboard from './screens/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <ChatBot/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/service" element={<PetService/>}/>
          <Route path="/supplies" element={<PetSupplies/>}/>
          <Route path="/events" element={<Events/>}/>
          <Route path="/lost" element={<LostFound />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/disease" element={<Diseases/>}/>
          <Route path="/petguidelines" element={<PetCareGuidelines/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/animalwelfare' element={<AnimalWelfare/>}/>
          <Route path='/petfunerals' element={<Petfuneral/>}/>
          <Route path='/matefinder' element={<Petfinder/>}/>
          <Route path='/playdates' element={<PlayDate/>}/>
          <Route path='/vet-appointments' element={<VetAppointments/>}/>
          <Route path='/more-pets' element={<Adoption/>}/>
          <Route path='/grooming' element={<Grooming/>}/>
          <Route path='/caretaking' element={<Caretaking/>}/>
          <Route path='/training' element={<Training/>}/>
          <Route path='/recommendationsystem' element={<PetRecommendation/>}/>
          <Route path='/profile' element={<Dashboard/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
