import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PacientiCRUD = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showSub, setShowSub] = useState(false);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [complaint, setComplaint] = useState('');
  const [userId, setUserId] = useState('');

  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [editSurname, setEditSurname] = useState('');
  const [editBirthDate, setEditBirthDate] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editGender, setEditGender] = useState('');
  const [editComplaint, setEditComplaint] = useState('');
  const [editUserId, setEditUserId] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const token = localStorage.getItem('token');

  const getData = () => {
    axios.get('http://localhost:5038/api/PacientiModels', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((result) => {
      setData(result.data);
    })
    .catch((error) => {
      toast.error('Error fetching data');
    });
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^[0-9]*$/;
    return phoneRegex.test(phone);
  };

  const handleEdit = (id) => {
    axios.get(`http://localhost:5038/api/PacientiModels/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      const patient = response.data;

      setEditId(patient.id_P);
      setEditName(patient.emri);
      setEditSurname(patient.mbiemri);
      setEditBirthDate(patient.dataELindjes);
      setEditPhone(patient.numriTel);
      setEditGender(patient.gjinia);
      setEditComplaint(patient.ankesa);
      setEditUserId(patient.userId);

      setShow(true);
    })
    .catch((error) => {
      toast.error("Error fetching patient details.");
    });
  };

  const handleUpdate = () => {
    if (!editName || !editSurname || !editBirthDate || !editPhone || !editGender || !editUserId) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (!isValidPhone(editPhone)) {
      toast.error('Please enter a valid phone number.');
      return;
    }

    const url = `http://localhost:5038/api/PacientiModels/${editId}`;
    const updatedPatient = {
      "Id_P": editId,
      "Emri": editName,
      "Mbiemri": editSurname,
      "DataELindjes": editBirthDate,
      "NumriTel": editPhone,
      "Gjinia": editGender,
      "Ankesa": editComplaint,
      "UserId": editUserId
    };

    axios.put(url, updatedPatient, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(() => {
      setShow(false);
      getData();
      clear();
      toast.success("Patient updated successfully!");
    })
    .catch((error) => {
      toast.error("Error updating patient.");
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      axios.delete(`http://localhost:5038/api/PacientiModels/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(() => {
        getData();
        toast.success('Patient deleted successfully!');
      })
      .catch((error) => {
        toast.error('Error deleting patient');
      });
    }
  };

  const handleSave = () => {
    if (!name || !surname || !birthDate || !phone || !gender || !userId) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (!isValidPhone(phone)) {
      toast.error('Please enter a valid phone number.');
      return;
    }

    const url = "http://localhost:5038/api/PacientiModels";
    const newPatient = {
      "Emri": name,
      "Mbiemri": surname,
      "DataELindjes": birthDate,
      "NumriTel": phone,
      "Gjinia": gender,
      "Ankesa": complaint,
      "UserId": userId
    };

    axios.post(url, newPatient, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(() => {
      setShowSub(false);
      getData();
      clear();
      toast.success('Patient added successfully!');
    })
    .catch((error) => {
      toast.error('Error adding patient');
    });
  };

  const clear = () => {
    setName('');
    setSurname('');
    setBirthDate('');
    setPhone('');
    setGender('');
    setComplaint('');
    setUserId('');
    setEditName('');
    setEditSurname('');
    setEditBirthDate('');
    setEditPhone('');
    setEditGender('');
    setEditComplaint('');
    setEditUserId('');
  };
  const userRole = localStorage.getItem('role'); // Make sure the role is stored in localStorage during login
  
  if (userRole !== 'admin') {
    return <h2>Unauthorized: You do not have access to this page.</h2>;
  }

  return (
    <Fragment>
      <h1 style={{ textAlign: 'center', color: 'rgb(86, 168, 86)' }}>Pacienti</h1>
      <ToastContainer />
      <Container className="mt-5">
        <Row className="text-center">
          <Col>
            <Button variant="outline-success" onClick={() => setShowSub(true)}>Add Patient</Button>
          </Col>
        </Row>
      </Container><br/>
      <Modal show={showSub} onHide={() => setShowSub(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Patient</Modal.Title> 
        </Modal.Header>
        <Modal.Body>
          <input type='text' className="form-control" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type='text' className="form-control mt-3" placeholder="Enter Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
          <input type='date' className="form-control mt-3" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          <input type='text' className="form-control mt-3" placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input type='text' className="form-control mt-3" placeholder="Enter Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
          <input type='text' className="form-control mt-3" placeholder="Enter Complaint" value={complaint} onChange={(e) => setComplaint(e.target.value)} />
          <input type='text' className="form-control mt-3" placeholder="Enter UserId" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSub(false)}>Cancel</Button>
          <Button variant="success" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
      <Container className="text-center">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Birth Date</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Complaint</th>
              <th>UserId</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id_P}>
                <td>{index + 1}</td>
                <td>{item.emri}</td>
                <td>{item.mbiemri}</td>
                <td>{item.dataELindjes}</td>
                <td>{item.numriTel}</td>
                <td>{item.gjinia}</td>
                <td>{item.ankesa}</td>
                <td>{item.userId}</td>
                <td>
                  <Button variant="success" className="me-2" onClick={() => handleEdit(item.id_P)}>Edit</Button>
                  <Button variant="outline-light" onClick={() => handleDelete(item.id_P)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='text' className="form-control" placeholder="Enter Name" value={editName} onChange={(e) => setEditName(e.target.value)} />
          <input type='text' className="form-control mt-3" placeholder="Enter Surname" value={editSurname} onChange={(e) => setEditSurname(e.target.value)} />
          <input type='date' className="form-control mt-3" value={editBirthDate} onChange={(e) => setEditBirthDate(e.target.value)} />
          <input type='text' className="form-control mt-3" placeholder="Enter Phone Number" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
          <input type='text' className="form-control mt-3" placeholder="Enter Gender" value={editGender} onChange={(e) => setEditGender(e.target.value)} />
          <input type='text' className="form-control mt-3" placeholder="Enter Complaint" value={editComplaint} onChange={(e) => setEditComplaint(e.target.value)} />
          <input type='text' className="form-control mt-3" placeholder="Enter UserId" value={editUserId} onChange={(e) => setEditUserId(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          <Button variant="success" onClick={handleUpdate}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default PacientiCRUD;
