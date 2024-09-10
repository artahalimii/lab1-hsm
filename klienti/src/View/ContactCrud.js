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

const ContactCRUD = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
 

  const token = localStorage.getItem('token');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get('http://localhost:5038/api/Contact', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((result) => {
      setData(result.data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
      toast.error('Error fetching data');
    });
  };

  

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      axios.delete(`http://localhost:5038/api/Contact/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(() => {
        getData();
        toast.success('Contact deleted successfully!');
      })
      .catch((error) => {
        toast.error('Error deleting contact');
        console.error('Error deleting contact:', error.response ? error.response.data : error.message);
      });
    }
  };

  const handleSave = () => {
    if (!name || !email) {
      toast.error('Please fill in all fields.');
      return;
    }

    const url = "http://localhost:5038/api/Contact";
    const newContact = {
      name,
      email,
      message
    };

    axios.post(url, newContact, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(() => {
      setShowSub(false);
      getData();
      clear();
      toast.success('Contact added successfully!');
    })
    .catch((error) => {
      toast.error('Error adding contact');
      console.error('Error adding contact:', error.response ? error.response.data : error.message);
    });
  };

  const clear = () => {
    setName('');
    setEmail('');
    setMessage('');
    
  }
   // Check user role
   const userRole = localStorage.getItem('role'); // Make sure the role is stored in localStorage during login
  
   if (userRole !== 'admin') {
     return <h2>Unauthorized: You do not have access to this page.</h2>;
   }
 

  return (
    <Fragment>
      <h1 style={{ textAlign: 'center', color: 'rgb(86, 168, 86)' }}>Contacts</h1>
      <ToastContainer />
      <Container className="mt-5">
        <Row className="text-center">
          <Col>
            <Button variant="outline-success" onClick={() => setShowSub(true)}>Add Contact</Button>
          </Col>
        </Row>
      </Container>
      <Modal show={showSub} onHide={() => setShowSub(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='text' className="form-control" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type='email' className="form-control mt-3" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <textarea className="form-control mt-3" placeholder="Enter Message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSub(false)}>Cancel</Button>
          <Button variant="success" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
      <Container className="text-center mt-3">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? 
              data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.message}</td>
                  <td>
                    
                    <Button variant="outline-light" onClick={() => handleDelete(item.contactId)}>Delete</Button>
                  </td>
                </tr>
              ))
              : 'Loading.......'
            }
          </tbody>
        </Table>
      </Container>
      
    </Fragment>
  );
};

export default ContactCRUD;
