import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CRUD from './CRUD';
import InfCrud  from './InfCrud ';
import PacCrud from './PacCrud';
import ServCrud from './ServCrud';
import ReservationCrud from './ReservationCrud';
import RekCrud from './RekCrud';
import Header from './Header';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Home from './Home';
import Services from './Services';
import Doktori from './Doktori';
import AboutUs from './About';
import ContactForm from './ContactForm';
import PatientDashboard from './PatientDashboard';
import ContactCRUD from './ContactCrud';


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
      </Routes>
    </>
  );
}

export default App;
