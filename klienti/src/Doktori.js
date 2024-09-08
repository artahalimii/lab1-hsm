import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Doktori = () => {
  const [patients, setPatients] = useState([]);
  const [records, setRecords] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

 useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const Id = localStorage.getItem('Id'); 

      const reservationsResponse = await axios.get(`http://localhost:5038/api/ReservationModels?doctorId=${Id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setReservations(reservationsResponse.data);

      const recordsResponse = await axios.get(`http://localhost:5038/api/RekordModels?doctorId=${Id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setRecords(recordsResponse.data);

      const patientIds = new Set([
        ...reservationsResponse.data.map(r => r.patient),
        ...recordsResponse.data.map(r => r.id_P)
      ]);

      console.log('Patient IDs:', Array.from(patientIds));  // Log patient IDs

      const patientsResponse = await axios.get(`http://localhost:5038/api/PacientiModels`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log('Patients Response:', patientsResponse.data);  // Log full patient data
      setPatients(patientsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
      toast.error('Error fetching data');
    }
  };

  fetchData();
}, []);


  return (
    <>
      <ToastContainer />
      <Container className="mt-5">
        <h1 className="text-center">Dashboard i Doktorit</h1>
        
        {/* Patients Table */}
        <h2 className="mt-4">Pacientet</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Emri</th>
              <th>Email</th>
              <th>Telefoni</th>
              <th>Veprime</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? patients.map((patient, index) => (
              <tr key={patient.id_P}>
                <td>{index + 1}</td>
                <td>{patient.emri}</td>
                <td>{patient.email}</td>
                <td>{patient.numriTel}</td>
                <td>
                  <Button variant="info" onClick={() => handleShow(patient)}>Detajet</Button>
                </td>
              </tr>
            )) : <tr><td colSpan="5">Loading...</td></tr>}
          </tbody>
        </Table>

        {/* Records Table */}
        <h2 className="mt-4">Rekordet</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>ID Rekordi</th>
              <th>Diagnoza</th>
              <th>Receta</th>
              <th>Rezultatet</th>
              <th>Pacienti</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? records.map((record, index) => (
              <tr key={record.id_Rek}>
                <td>{index + 1}</td>
                <td>{record.id_Rek}</td>
                <td>{record.diagnoza}</td>
                <td>{record.receta}</td>
                <td>{record.rezultatet}</td>
                <td>{patients.find(p => p.id_P === record.id_P)?.emri || 'Unknown'}</td>
              </tr>
            )) : <tr><td colSpan="6">Loading...</td></tr>}
          </tbody>
        </Table>

        {/* Reservations Table */}
        <h2 className="mt-4">Rezervimet</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>ID Rezervimi</th>
              <th>Data</th>
              <th>Koha</th>
              <th>Pacienti</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length > 0 ? reservations.map((reservation, index) => (
              <tr key={reservation.reservationId}>
                <td>{index + 1}</td>
                <td>{reservation.reservationId}</td>
                <td>{reservation.reservationDate}</td>
                <td>{reservation.reservationTime}</td>
                <td>{patients.find(p => p.id_P === reservation.patient)?.emri || 'Unknown'}</td>
              </tr>
            )) : <tr><td colSpan="5">Loading...</td></tr>}
          </tbody>
        </Table>
      </Container>

      {/* Patient Details Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detajet e Pacientit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPatient ? (
            <div>
              <h4>Emri: {selectedPatient.emri}</h4>
              <p>Mbiemri: {selectedPatient.mbiemri}</p>
              <p>Email: {selectedPatient.email}</p>
              <p>Telefoni: {selectedPatient.numriTel}</p>
              <p>Data e Lindjes: {selectedPatient.dataELindjes}</p>
              <p>Ankesa: {selectedPatient.ankesa}</p>
              {/* Add more fields as needed */}
            </div>
          ) : (
            <p>Nuk është zgjedhur asnjë pacient</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Mbyll</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Doktori;

