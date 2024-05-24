import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';

const ReservationCrud = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowSub = () => setShowSub(true);
  const handleCloseSub = () => setShowSub(false);
  const [showPaci, setShowPaci] = useState(false);
  const [selectedPaci, setSelectedPaci] = useState(null);
  const [showDoki, setShowDoki] = useState(false);
  const [selectedDoki, setSelectedDoki] = useState(null);

  const handleShowPaci = (pacienti) => {
    setSelectedPaci(pacienti);
    setShowPaci(true);
  };

  const handleShowDoki = (doktori) => {
    setSelectedDoki(doktori);
    setShowDoki(true);
  };

  const handleClosePaci = () => {
    setShowPaci(false);
    setSelectedPaci(null);
  };

  const handleCloseDoki = () => {
    setShowDoki(false);
    setSelectedDoki(null);
  };

  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [doktori, setDoktori] = useState({});
  const [pacienti, setPacienti] = useState({});

  //edit form
  const [editReservationId, setEditReservationId] = useState('');
  const [editReservationDate, setEditReservationDate] = useState('');
  const [editReservationTime, setEditReservationTime] = useState('');
  const [editPatient, setEditPatient] = useState('');
  const [editDoctor, setEditDoctor] = useState('');
  const [editDoktori, setEditDoktori] = useState({});
  const [editPacienti, setEditPacienti] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get('http://localhost:5038/api/ReservationModels')
      .then((result) => {
        setData(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleEdit = (reservationId) => {
    handleShow();
    axios.get(`http://localhost:5038/api/ReservationModels/${reservationId}`)
      .then((result) => {
        const { reservationDate, reservationTime, patient, doctor, doktori, pacienti } = result.data;
        setEditReservationDate(reservationDate);
        setEditReservationTime(reservationTime);
        setEditPatient(patient);
        setEditDoctor(doctor);
        setEditDoktori(doktori);
        setEditPacienti(pacienti);
        setEditReservationId(reservationId);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleDelete = (reservationId) => {
    if (window.confirm("Are you sure you want to delete this reservation?") === true) {
      axios.delete(`http://localhost:5038/api/ReservationModels/${reservationId}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success('Reservation deleted successfully!');
            getData(); // Refresh the data after successful deletion
          }
        })
        .catch((error) => {
          toast.error('Error deleting reservation');
          console.error('Error deleting reservation:', error);
        });
    }
  }

  const handleUpdate = () => {
    if (!editReservationDate || !editReservationTime || !editPatient || !editDoctor) {
      toast.error('Please fill in all fields.');
      return;
    }
    const url = `http://localhost:5038/api/ReservationModels/${editReservationId}`;
    const data = {
      "ReservationId": editReservationId,
      "ReservationDate": editReservationDate,
      "ReservationTime": editReservationTime,
      "Patient": editPatient,
      "Doctor": editDoctor,
      "DoctorNavigation": editDoktori,
      "PatientNavigation": editPacienti
    };
    axios.put(url, data)
      .then((result) => {
        handleClose();
        getData();
        clear();
        toast.success('Update completed successfully');
      })
      .catch((error) => {
        console.error('Error updating reservation:', error);
      });
  }

  const handleSave = () => {
    if (!reservationDate || !reservationTime || !patient || !doctor) {
      toast.error('Please fill in all fields.');
      return;
    }
    const url = "http://localhost:5038/api/ReservationModels";
    const data = {
      "ReservationDate": reservationDate,
      "ReservationTime": reservationTime,
      "Patient": patient,
      "Doctor": doctor,
      "DoctorNavigation": doktori,
      "PatientNavigation": pacienti
    };
    axios.post(url, data)
      .then((result) => {
        handleCloseSub();
        getData();
        clear();
        toast.success('Reservation added successfully!');
      })
      .catch((error) => {
        toast.error('Error adding reservation');
        console.error('Error adding reservation:', error);
      });
  };

  const clear = () => {
    setReservationDate('');
    setReservationTime('');
    setPatient('');
    setDoctor('');
    setDoktori({});
    setPacienti({});
    setEditReservationDate('');
    setEditReservationTime('');
    setEditPatient('');
    setEditDoctor('');
    setEditDoktori({});
    setEditPacienti({});
  }

  return (
    <Fragment>
      <h1 style={{ textAlign: 'center', color:' rgb(86, 168, 86)' }}>Reservations</h1>
      <ToastContainer />
      <Container className="mt-5">
        <Row className="text-center">
          <Col>
            <Button variant="outline-success" onClick={handleShowSub}>Add Reservation</Button>
          </Col>
        </Row>
      </Container>
      <Modal show={showSub} onHide={handleCloseSub}>
        <Modal.Header closeButton>
          <Modal.Title>Add Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='date' className="form-control" placeholder="Enter Reservation Date" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} />
          <input type='time' className="form-control mt-3" placeholder="Enter Reservation Time" value={reservationTime} onChange={(e) => setReservationTime(e.target.value)} />
          <input type='number' className="form-control mt-3" placeholder="Enter Patient ID" value={patient} onChange={(e) => setPatient(parseInt(e.target.value))} />
          <input type='number' className="form-control mt-3" placeholder="Enter Doctor ID" value={doctor} onChange={(e) => setDoctor(parseInt(e.target.value))} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSub}>Cancel</Button>
          <Button variant="success" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
      <br></br>
      <Container className="text-center">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Reservation Date</th>
              <th>Reservation Time</th>
              <th>Patient ID</th>
              <th>Doctor ID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              data && data.length > 0 ?
                data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.reservationDate}</td>
                      <td>{item.reservationTime}</td>
                      <td><Button variant="outline-light" onClick={() => handleShowPaci(item.patientNavigation)}>{item.patient}</Button></td>
                      <td><Button variant="outline-light" onClick={() => handleShowDoki(item.doctorNavigation)}>{item.doctor}</Button></td>
                      <td>
                        <Button variant="success" onClick={() => handleEdit(item.reservationId)}>Edit</Button> &nbsp;
                        <Button variant="outline-light" onClick={() => handleDelete(item.reservationId)}>Delete</Button>
                      </td>
                    </tr>
                  )
                })
                :
                'Loading....'
            }
          </tbody>
        </Table>

        {/* Patient Modal */}
        <Modal show={showPaci} onHide={handleClosePaci}>
          <Modal.Header closeButton>
            <Modal.Title>Patient Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedPaci && (
              <ListGroup>
                <ListGroup.Item>{selectedPaci.emri}</ListGroup.Item><br />
                <ListGroup.Item>{selectedPaci.mbiemri}</ListGroup.Item><br />
                <ListGroup.Item>{selectedPaci.dataELindjes}</ListGroup.Item><br />
                <ListGroup.Item>{selectedPaci.gjinia}</ListGroup.Item><br />
                <ListGroup.Item>{selectedPaci.numriTel}</ListGroup.Item><br />
                <ListGroup.Item>{selectedPaci.ankesa}</ListGroup.Item><br />
              </ListGroup>
            )}
          </Modal.Body>
        </Modal>

        {/* Doctor Modal */}
        <Modal show={showDoki} onHide={handleCloseDoki}>
          <Modal.Header closeButton>
            <Modal.Title>Doctor Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedDoki && (
              <ListGroup>
                <ListGroup.Item>{selectedDoki.emri}</ListGroup.Item><br />
                <ListGroup.Item>{selectedDoki.dataELindjes}</ListGroup.Item><br />
                <ListGroup.Item>{selectedDoki.email}</ListGroup.Item><br />
                <ListGroup.Item>{selectedDoki.specializimi}</ListGroup.Item><br />
                <ListGroup.Item>{selectedDoki.photoFileName}</ListGroup.Item><br />
              </ListGroup>
            )}
          </Modal.Body>
        </Modal>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify/Update Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            <input type='date' className="form-control" placeholder="Enter Reservation Date" value={editReservationDate} onChange={(e) => setEditReservationDate(e.target.value)} />
          </Col><br />
          <Col>
            <input type='time' className="form-control" placeholder="Enter Reservation Time" value={editReservationTime} onChange={(e) => setEditReservationTime(e.target.value)} />
          </Col><br />
          <Col>
            <input type='number' className="form-control" placeholder="Enter Patient ID" value={editPatient} onChange={(e) => setEditPatient(parseInt(e.target.value))} />
          </Col><br />
          <Col>
            <input type='number' className="form-control" placeholder="Enter Doctor ID" value={editDoctor} onChange={(e) => setEditDoctor(parseInt(e.target.value))} />
          </Col><br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ReservationCrud;
