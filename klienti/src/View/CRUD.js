import React, { useState, useEffect, Fragment, useMemo } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import '../App.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CRUD = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowSub = () => setShowSub(true);
  const handleCloseSub = () => setShowSub(false);
  

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [specializimi, setSpecializimi] = useState('');
  const [pervoja, setPervoja] = useState('');
  const [foto, setFoto] = useState('');
  const [userId, setUserId] = useState('');

  //edit form
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editSpecializimi, setEditSpecializimi] = useState('');
  const [editPervoja, setEditPervoja] = useState('');
  const [editFoto, setEditFoto] = useState('');
  const [editUserId, setEditUserId] = useState('');


  useEffect(() => {
    getData();
  }, []);

  //---
  const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

  const getData = () => {
    axios.get('http://localhost:5038/api/DoktoriModels', {
      headers: {
        'Authorization': `Bearer ${token}` // Add the Authorization header
      }
    })
    .then((result) => {
      console.log('Fetched data:', result.data);
      setData(result.data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
      toast.error('Error fetching data');
    });
  };
  


  // Basic email validation using regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isValidPervoja = (pervoja) => {
    if (pervoja === null) {
        return true;
    }
    const pervojaRegex = /^[0-9]\d*$/;
    return pervojaRegex.test(pervoja.toString());
  };

  const handleEdit = (id) => {
    // Fetch the doctor by ID and populate the form
    axios.get(`http://localhost:5038/api/DoktoriModels/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`  // Include token if required
      }
    })
    .then((response) => {
      const doctor = response.data;
  
      // Set form values based on fetched data
      setEditId(doctor.id);
      setEditName(doctor.emri);
      setEditDate(doctor.dataELindjes);
      setEditEmail(doctor.email);
      setEditSpecializimi(doctor.specializimi);
      setEditPervoja(doctor.pervoja);
      setEditFoto(doctor.photoFileName);
      setEditUserId(doctor.userId);
  
      handleShow();  // Open the edit modal after data is populated
    })
    .catch((error) => {
      console.error("Error fetching doctor:", error);
      toast.error("Error fetching doctor details.");
    });
  };
  

  const handleUpdate = () => {
    if (!editName || !editDate || !editEmail || !editSpecializimi || !editFoto || !editUserId) {
      toast.error('Please fill in all fields.');
      return;
    }
    if (!isValidEmail(editEmail)) {
      toast.error('Please enter a valid email address.');
      return;
    }
  
    if (!isValidPervoja(editPervoja)) {
      toast.error('Please enter a valid number.');
      return;
    }
    const url = `http://localhost:5038/api/DoktoriModels/${editId}`;
    const updatedDoctor = {
      "ID": editId,
      "Emri": editName,
      "DataELindjes": editDate,
      "Email": editEmail,
      "Specializimi": editSpecializimi,
      "Pervoja": editPervoja,
      "PhotoFileName": editFoto,
      "UserId": editUserId
    };
  
    axios.put(url, updatedDoctor, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      handleClose();  // Close modal after success
      getData();      // Refresh the data after editing
      clear();        // Clear the form
      toast.success("Doctor updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating doctor:", error.response ? error.response.data : error.message);
      toast.error("Error updating doctor.");
    });
  };
  


  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      axios.delete(`http://localhost:5038/api/DoktoriModels/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`  // Include token if authorization is required
        }
      })
        .then((result) => {
          getData();  // Refresh the data after successful deletion
          toast.success('Doctor deleted successfully!');
        })
        .catch((error) => {
          toast.error('Error deleting doctor');
          console.error('Error deleting doctor:', error.response ? error.response.data : error.message);
        });
    }
  };
  

  const handleSave = () => {
    if (!name || !date || !email || !specializimi || !foto || !userId) {
      toast.error('Please fill in all fields.');
      return;
    }
  
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
  
    if (!isValidPervoja(pervoja)) {
      toast.error('Please enter a valid number.');
      return;
    }
  
    const url = "http://localhost:5038/api/DoktoriModels";
    const data = {
      "Emri": name,
      "DataELindjes": date,
      "Email": email,
      "Specializimi": specializimi,
      "Pervoja": pervoja,
      "PhotoFileName": foto,
      "UserId": userId
    };
  
    axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Add the token here if needed
      }
    })
      .then((result) => {
        handleCloseSub();
        getData(); // Refresh the list after adding the doctor
        clear();
        toast.success('Doctor added successfully!');
      })
      .catch((error) => {
        toast.error('Error adding doctor');
        console.error('Error adding doctor:', error.response ? error.response.data : error.message);
      });
  };
  

  const clear = () => {
    setName('');
    setDate('');
    setEmail('');
    setSpecializimi('');
    setPervoja('');
    setFoto('');
    setUserId('');
    setEditName('');
    setEditDate('');
    setEditEmail('');
    setEditSpecializimi('');
    setEditPervoja('');
    setEditFoto('');
    setEditUserId('');
  }
   // Check user role
   const userRole = localStorage.getItem('role'); // Make sure the role is stored in localStorage during login
  
   if (userRole !== 'admin') {
     return <h2>Unauthorized: You do not have access to this page.</h2>;
   }
 
  

  return (
    
   <Fragment>
      <h1 style={{ textAlign: 'center', color:' rgb(86, 168, 86)'}}>Doktori</h1>
      <ToastContainer />
      <Container className="mt-5">
        <Row className="text-center">
          <Col>
            <Button variant="outline-success" onClick={handleShowSub}>Add Doctor</Button>
          </Col>
        </Row>
      </Container>
      <Modal show={showSub} onHide={handleCloseSub}>
        <Modal.Header closeButton>
          <Modal.Title>Add Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='text' className="form-control" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type='date' className="form-control mt-3" value={date} onChange={(e) => setDate(e.target.value)} />
          <input type='text' className="form-control mt-3" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='text' className="form-control mt-3" placeholder="Enter Specialization" value={specializimi} onChange={(e) => setSpecializimi(e.target.value)} />
          <input type='number' className="form-control mt-3" placeholder="Enter Experience" value={pervoja} onChange={(e) => setPervoja(parseInt(e.target.value))} />
          <input type='text' className="form-control mt-3" placeholder="Enter Photo URL" value={foto} onChange={(e) => setFoto(e.target.value)} />
          <input type='text' className="form-control mt-3" placeholder="Enter UserId" value={userId} onChange={(e) => setUserId(e.target.value)} />
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
              <th>Name and Surname</th>
              <th>Date</th>
              <th>Email</th>
              <th>Speci</th>
              <th>Pervoj</th>
              <th>Foto</th>
              <th>UserId</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              data && data.length > 0 ?
                data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{item.emri}</td>
                      <td>{item.dataELindjes}</td>
                      <td>{item.email}</td>
                      <td>{item.specializimi}</td>
                      <td>{item.pervoja}</td>
                      <td>
                     <img 
                      src={item.photoFileName} 
                      alt="Doctor" 
                       style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                      />
                      </td>
                      <td>{item.userId}</td>
                      <td>
                      <Button variant="success" onClick={() => handleEdit(item.id)}>Edit</Button>
                      <Button variant="outline-light" onClick={() => handleDelete(item.id)}>Delete</Button>
                      </td>
                    </tr>
                  )
                })
                :
                'Loading.......'
            }
          </tbody>
        </Table>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify/update Doktoret</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            <input type='text' className="form-control" placeholder="Enter Name" value={editName} onChange={(e) => setEditName(e.target.value)} />
          </Col><br />
           <Col>
            <input type='date' className="form-control" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
          </Col><br />
          {/*  <Col >
            <DatePicker selected={date} onChange={date => setEditDate(date)} className="form-control" />
          </Col> */ }
          <Col>
            <input type='text' className="form-control" placeholder="Enter Email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
          </Col><br />
          <Col>
            <input type='text' className="form-control" placeholder="Enter Specializimi" value={editSpecializimi} onChange={(e) => setEditSpecializimi(e.target.value)} />
          </Col><br />
          <Col>
            <input type='number' className="form-control" value={editPervoja} onChange={(e) => setEditPervoja(parseInt(e.target.value))} />
          </Col><br />
          <Col>
            <input type='text' className="form-control" placeholder="Enter Foto url" value={editFoto} onChange={(e) => setEditFoto(e.target.value)} />
          </Col><br />
          <Col>
            <input type='text' className="form-control" placeholder="Enter User Id" value={editUserId} onChange={(e) => setEditUserId(e.target.value)} />
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


export default CRUD;