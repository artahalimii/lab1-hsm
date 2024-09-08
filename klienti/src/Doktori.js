import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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

        // Fetch reservations
        const reservationsResponse = await axios.get(`http://localhost:5038/api/doctor-dashboard/reservations`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setReservations(reservationsResponse.data);

        // Fetch records
        const recordsResponse = await axios.get(`http://localhost:5038/api/doctor-dashboard/records`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setRecords(recordsResponse.data);

        // Collect patient IDs from reservations and records
        const patientIds = new Set([
          ...reservationsResponse.data.map(r => r.patient),
          ...recordsResponse.data.map(r => r.id_P)
        ]);

        if (patientIds.size === 0) {
          setPatients([]);
          return;
        }

        // Fetch patients based on collected IDs
        const patientsResponse = await axios.get(`http://localhost:5038/api/PacientiModels`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        // Filter patients to only those with IDs in patientIds
        const filteredPatients = patientsResponse.data.filter(patient => patientIds.has(patient.id_P));
        setPatients(filteredPatients);

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
        <h1 className="text-center mb-4">Dashboard i Doktorit</h1>

        <Row>
          <Col md={12} lg={4} className="mb-4">
            <h2>Pacientet</h2>
            <Table striped bordered hover variant="light">
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
          </Col>

          <Col md={12} lg={4} className="mb-4">
            <h2>Rekordet</h2>
            <Table striped bordered hover variant="light">
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
          </Col>

          <Col md={12} lg={4} className="mb-4">
            <h2>Rezervimet</h2>
            <Table striped bordered hover variant="light">
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
          </Col>
        </Row>
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
