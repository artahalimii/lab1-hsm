import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar'; // Ensure correct path

const styles = {
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '250px',
    backgroundColor: '#f8f9fa',
    padding: '15px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    marginTop: '84px',
  },
  content: {
    marginLeft: '250px',
    padding: '15px',
    paddingTop: '60px',
    flexGrow: 1,
  },
  sidebarLink: {
    padding: '10px 15px',
    fontSize: '16px',
    color: '#333',
    textDecoration: 'none',
    display: 'block',
    transition: 'background-color 0.3s, color 0.3s',
  },
  sidebarLinkActive: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
};

const Doktori = () => {
  const [activeTab, setActiveTab] = useState('patients');
  const [patients, setPatients] = useState([]);
  const [records, setRecords] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [nurses, setNurses] = useState({});


  const handleClose = () => setShowModal(false);
  const handleShow = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleSelectTab = (key) => setActiveTab(key);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
  
        // Fetch reservations
        const reservationsResponse = await axios.get('http://localhost:5038/api/Dashboard/doctor/reservations', {
          headers: { 'Authorization': `Bearer ${token}` } // Fixed the template literal here
        });
        setReservations(reservationsResponse.data);
  
        // Fetch records
        const recordsResponse = await axios.get('http://localhost:5038/api/Dashboard/doctor/records', {
          headers: { 'Authorization': `Bearer ${token}` } // Fixed the template literal here
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
        const patientsResponse = await axios.get('http://localhost:5038/api/PacientiModels', {
          headers: { 'Authorization': `Bearer ${token}` } // Fixed the template literal here
        });
  
        // Filter patients to only those with IDs in patientIds
        const filteredPatients = patientsResponse.data.filter(patient => patientIds.has(patient.id_P));
        setPatients(filteredPatients);
  
        // Fetch nurses for the week
        const nursesResponse = await axios.get('http://localhost:5038/api/Dashboard/doctor/nurses', {
          headers: { 'Authorization': `Bearer ${token}` } // Fixed the template literal here
        });
        setNurses(nursesResponse.data);
  
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        toast.error('Error fetching data');
      }
    };
  
    fetchData();
  }, []);
   // Check user role
   const userRole = localStorage.getItem('role'); // Make sure the role is stored in localStorage during login
  
   if (userRole !== 'doktor') {
     return <h2>Unauthorized: You do not have access to this page.</h2>;
   }
 
  



  return (
    <>
      <ToastContainer />
      <Navbar />
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <Nav className="flex-column">
            <Nav.Link 
              href="#patients" 
              style={{ ...styles.sidebarLink, ...(activeTab === 'patients' ? styles.sidebarLinkActive : {}) }}
              onClick={() => handleSelectTab('patients')}
            >
              Pacientet
            </Nav.Link>
            <Nav.Link 
              href="#records" 
              style={{ ...styles.sidebarLink, ...(activeTab === 'records' ? styles.sidebarLinkActive : {}) }}
              onClick={() => handleSelectTab('records')}
            >
              Rekordet
            </Nav.Link>
            <Nav.Link 
              href="#reservations" 
              style={{ ...styles.sidebarLink, ...(activeTab === 'reservations' ? styles.sidebarLinkActive : {}) }}
              onClick={() => handleSelectTab('reservations')}
            >
              Rezervimet
            </Nav.Link>
            <Nav.Link 
              href="#nurses" 
              style={{ ...styles.sidebarLink, ...(activeTab === 'nurses' ? styles.sidebarLinkActive : {}) }}
              onClick={() => handleSelectTab('nurses')}
            >
              Nurses
            </Nav.Link>
          </Nav>
        </div>

        <div style={styles.content}>
          <Container className="mt-5">
            <Row>
              <Col>
                <Tab.Container activeKey={activeTab}>
                  <Tab.Content>
                    <Tab.Pane eventKey="patients">
                      <Card className="shadow-sm mb-4">
                        <Card.Header>
                          <h2>Pacientet</h2>
                        </Card.Header>
                        <Card.Body>
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
                        </Card.Body>
                      </Card>
                    </Tab.Pane>

                    <Tab.Pane eventKey="records">
                      <Card className="shadow-sm mb-4">
                        <Card.Header>
                          <h2>Rekordet</h2>
                        </Card.Header>
                        <Card.Body>
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
                        </Card.Body>
                      </Card>
                    </Tab.Pane>

                    <Tab.Pane eventKey="reservations">
                      <Card className="shadow-sm mb-4">
                        <Card.Header>
                          <h2>Rezervimet</h2>
                        </Card.Header>
                        <Card.Body>
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
                        </Card.Body>
                      </Card>
                      </Tab.Pane>
                      
                      <Tab.Pane eventKey="nurses">
  <Card className="shadow-sm mb-4">
    <Card.Header>
      <h2>Nurses for the Week</h2>
    </Card.Header>
    <Card.Body>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Day</th>
            <th>Nurse</th>  {/* Only one nurse */}
          </tr>
        </thead>
        <tbody>
          {Object.entries(nurses).map(([day, nurseList], index) => (
            <tr key={index}>
              <td>{day}</td>
              <td>{nurseList?.[0]?.emri || 'N/A'} {nurseList?.[0]?.mbiemri || ''}</td> {/* Display only Nurse 1 */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Card.Body>
  </Card>
</Tab.Pane>



                  </Tab.Content>
                </Tab.Container>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* Patient Details Modal */}
      <Modal 
        show={showModal} 
        onHide={handleClose}
        dialogClassName="modal-dialog-centered" /* Ensures Bootstrap centering */
        centered /* Additional Bootstrap prop to ensure centering */
      >
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
