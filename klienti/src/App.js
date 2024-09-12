import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import CRUD from './View/CRUD';
import InfCrud from './View/InfCrud';
import PacCrud from './View/PacCrud';
import ServCrud from './View/ServCrud';
import ReservationCrud from './View/ReservationCrud';
import RekCrud from './View/RekCrud';
import Header from './View/Header';
import LoginForm from './View/LoginForm';
import RegisterForm from './View/RegisterForm';
import Home from './View/Home';
import Services from './View/Services';
import Doktori from './View/Doktori';
import AboutUs from './View/About';
import ContactForm from './View/ContactForm';
import PatientDashboard from './View/PatientDashboard';
import ContactCRUD from './View/ContactCrud';
import Reviews from './View/Reviews';
function App() {
  const CRUDPaths = ['/Doki', '/InfCrud', '/RekCrud', '/PacCrud', '/ReservationCrud','/ServCrud'];

  const shouldShowHeader = (location) => {
    return CRUDPaths.includes(location.pathname);
  };

  return (
    <Router>
      <RouteRender />
    </Router>
  );
}

function RouteRender() {
  const location = useLocation();
  const CRUDPaths = ['/Doki', '/InfCrud', '/RekCrud', '/PacCrud', '/ReservationCrud','/ServCrud' , '/ContactCrud'];

  const shouldShowHeader = CRUDPaths.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/Doki" element={<CRUD />} />
        <Route path="/InfCrud" element={<InfCrud />} />
        <Route path="/RekCrud" element={<RekCrud />} />
        <Route path="/PacCrud" element={<PacCrud />} />
        <Route path="/ReservationCrud" element={<ReservationCrud />} />
        <Route path="/ServCrud" element={<ServCrud />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/RegisterForm" element={<RegisterForm />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Services" element={<Services />} />
         <Route path="/About" element={<AboutUs />} /> 
         <Route path="/Doktori" element={<Doktori />} /> 
         <Route path="/Contact" element={<ContactForm />} /> 
         <Route path="/PatientDashboard" element={<PatientDashboard />} /> 
         <Route path="/ContactCrud" element={<ContactCRUD />} /> 
         <Route path="/Reviews" element={<Reviews />} /> 
      </Routes>
    </>
  );
}

export default App;
