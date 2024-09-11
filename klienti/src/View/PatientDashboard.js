import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form'; 
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar'; 

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

const PatientDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [records, setRecords] = useState([]);
  const [doctors, setDoctors] = useState({});
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [reservationData, setReservationData] = useState({
    reservationDate: '',
    reservationTime: '',
    doctorId: '',
  });
  const [activeTab, setActiveTab] = useState('makeReservation');

  const handleSelectTab = (tab) => {
    if (tab === 'contactUs') {
      window.location.href = '/about#contactUs'; 
    } else {
      setActiveTab(tab);
    }
  };

  const handleReservationInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReservationSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token or patient ID is missing');

      await axios.post('http://localhost:5038/api/ReservationModels', {
        ...reservationData,
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      toast.success('Reservation made successfully');
      setShowReservationModal(false);
    } catch (error) {
      console.error('Error making reservation:', error.response ? error.response.data : error.message);
      toast.error(`Error making reservation: ${error.response ? error.response.data : error.message}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token is missing');

        const reservationsResponse = await axios.get(`http://localhost:5038/api/Dashboard/patient/reservations`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setReservations(reservationsResponse.data);

        const recordsResponse = await axios.get(`http://localhost:5038/api/Dashboard/patient/records`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setRecords(recordsResponse.data);

        const doctorsResponse = await axios.get(`http://localhost:5038/api/DoktoriModels`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const doctorsMap = doctorsResponse.data.reduce((acc, doctor) => {
          acc[doctor.id] = doctor.emri; 
          return acc;
        }, {});
        setDoctors(doctorsMap);

      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        toast.error(`Error fetching data: ${error.response ? error.response.data : error.message}`);
      }
    };

    fetchData();
  }, []);

  const userRole = localStorage.getItem('role');
  if (userRole !== 'patient') {
    return (
      <div className="text-center mt-5">
        <h2>Unauthorized: You do not have access to this page.</h2>
        <h3>
          Click <a href="./Home"> here </a>to go to our home page
        </h3>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div style={{ display: 'flex' }}>
        <div style={styles.sidebar}>
          <Nav className="flex-column">
            <Nav.Link
              href="#makeReservation"
              style={activeTab === 'makeReservation' ? styles.sidebarLinkActive : styles.sidebarLink}
              onClick={() => setActiveTab('makeReservation')}
            >
              Make a Reservation
            </Nav.Link>
            <Nav.Link
              href="#myReservations"
              style={activeTab === 'myReservations' ? styles.sidebarLinkActive : styles.sidebarLink}
              onClick={() => setActiveTab('myReservations')}
            >
              My Reservations
            </Nav.Link>
            <Nav.Link
              href="#myRecords"
              style={activeTab === 'myRecords' ? styles.sidebarLinkActive : styles.sidebarLink}
              onClick={() => setActiveTab('myRecords')}
            >
              My Records
            </Nav.Link>
            <Nav.Link 
              href="/About#contactUs"
              style={{ ...styles.sidebarLink, ...(activeTab === 'contactUs' ? styles.sidebarLinkActive : {}) }}
            >
              Contact Us
            </Nav.Link>
          </Nav>
        </div>

        <div style={styles.content}>
          <Container className="mt-5">
            <Row>
              <Col>
                <Tab.Container activeKey={activeTab}>
                  <Tab.Content>
                    <Tab.Pane eventKey="makeReservation">
                      <Card className="shadow-sm mb-4">
                        <Card.Header>
                          <h2>Make a Reservation</h2>
                        </Card.Header>
                        <Card.Body>
                          <Button variant="primary" onClick={() => setShowReservationModal(true)}>
                            Click here
                          </Button>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>

                    <Tab.Pane eventKey="myReservations">
                      <Card className="shadow-sm mb-4">
                        <Card.Header>
                          <h2>My Reservations</h2>
                        </Card.Header>
                        <Card.Body>
                          <Table striped bordered hover variant="light">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>ID Reservation</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Doctor</th>
                              </tr>
                            </thead>
                            <tbody>
                              {reservations.length > 0 ? reservations.map((reservation, index) => (
                                <tr key={reservation.reservationId}>
                                  <td>{index + 1}</td>
                                  <td>{reservation.reservationId}</td>
                                  <td>{reservation.reservationDate}</td>
                                  <td>{reservation.reservationTime}</td>
                                  <td>{doctors[reservation.doctor] || 'Unknown'}</td>
                                </tr>
                              )) : <tr><td colSpan="5">No Reservations</td></tr>}
                            </tbody>
                          </Table>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>

                    <Tab.Pane eventKey="myRecords">
                      <Card className="shadow-sm mb-4">
                        <Card.Header>
                          <h2>My Records</h2>
                        </Card.Header>
                        <Card.Body>
                          <Table striped bordered hover variant="light">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>ID Record</th>
                                <th>Diagnosis</th>
                                <th>Prescription</th>
                                <th>Results</th>
                                <th>Doctor</th>
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
                                  <td>{doctors[record.doctorId] || 'Unknown'}</td>
                                </tr>
                              )) : <tr><td colSpan="6">No Records</td></tr>}
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

      {/* Reservation Modal */}
      <Modal show={showReservationModal} onHide={() => setShowReservationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Make a Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formReservationDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="reservationDate"
                value={reservationData.reservationDate}
                onChange={handleReservationInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formReservationTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="reservationTime"
                value={reservationData.reservationTime}
                onChange={handleReservationInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDoctorId">
              <Form.Label>Doctor</Form.Label>
              <Form.Control
                as="select"
                name="doctorId"
                value={reservationData.doctorId}
                onChange={handleReservationInputChange}
              >
                <option value="">Select a Doctor</option>
                {Object.entries(doctors).map(([doctorId, doctorName]) => (
                  <option key={doctorId} value={doctorId}>
                    {doctorName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReservationModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleReservationSubmit}>
            Submit Reservation
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PatientDashboard;
