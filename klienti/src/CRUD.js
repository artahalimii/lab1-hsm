import React, { useState, useEffect, Fragment, useMemo } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import './App.css';
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

  //edit form
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editSpecializimi, setEditSpecializimi] = useState('');
  const [editPervoja, setEditPervoja] = useState('');
  const [editFoto, setEditFoto] = useState('');


  useEffect(() => {
    getData();
  }, []);

  //---
  const getData = () => {
    axios.get('http://localhost:5038/api/DoktoriModels')
      .then((result) => {
        setData(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }


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
    handleShow();
    axios.get(`http://localhost:5038/api/DoktoriModels/${id}`)
      .then((result) => {
        const { emri, dataELindjes, email, specializimi, pervoja, photoFileName } = result.data;
        setEditName(emri);
        setEditDate(dataELindjes);
        setEditEmail(email);
        setEditSpecializimi(specializimi);
        setEditPervoja(pervoja);
        setEditFoto(photoFileName);
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?") == true) {
      axios.delete(`http://localhost:5038/api/DoktoriModels/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success('Doctor deleted successfully!');
            getData(); // Refresh the data after successful deletion
          }
        })
        .catch((error) => {
          toast.error('Error deleting doctor');
          console.error('Error deleting doctor:', error);
        });
    }
  }


  const handleUpdate = () => {
    if (!editName || !editDate || !editEmail || !editSpecializimi || !editFoto) {//validimi
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
//validimi
    const url = `http://localhost:5038/api/DoktoriModels/${editId}`;
    const data = {
      "ID": editId,
      "Emri": editName,
      "DataELindjes": editDate,
      "Email": editEmail,
      "Specializimi": editSpecializimi,
      "Pervoja": editPervoja,
      "PhotoFileName": editFoto
    };
    axios.put(url, data)
      .then((result) => {
        handleClose();
        getData();
        clear();
        toast.success('Update u krye me sukses');
      })
      .catch((error) => {
        // Handle error
        console.error('Error adding doctor:', error);
      });
  }


  const handleSave = () => {
    if (!name || !date || !email || !specializimi || !foto) {
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
      "PhotoFileName": foto
    };
    axios.post(url, data)
      .then((result) => {
        handleCloseSub();
        getData();
        clear();
        toast.success('Doctor added successfully!');
      })
      .catch((error) => {
        toast.error('Error adding doctor');
        console.error('Error adding doctor:', error);
      });
  };


  const clear = () => {
    setName('');
    setDate('');
    setEmail('');
    setSpecializimi('');
    setPervoja('');
    setFoto('');
    setEditName('');
    setEditDate('');
    setEditEmail('');
    setEditSpecializimi('');
    setEditPervoja('');
    setEditFoto('');
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
                      <td>{item.photoFileName}</td>
                      <td>
                        <Button variant="success" onClick={() => handleEdit(item.id)}>Edit</Button> &nbsp;
                        <Button variant="outline-light" onClick={() => handleDelete(item.id)}>Delete</Button>
                      </td>
                    </tr>
                  )
                })
                :
                'Loading....'
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

