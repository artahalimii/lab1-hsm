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



const ServCrud = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowSub = () => setShowSub(true);
  const handleCloseSub = () => setShowSub(false);
  

  const [name, setName] = useState('');
  const [pershkrimi, setPershkrimi] = useState('');
  const [stafi, setStafi] = useState('');

  //edit form
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [editPershkrimi, setEditPershkrimi] = useState('');
  const [editStafi, setEditStafi] = useState('');


  useEffect(() => {
    getData();
  }, []);

  //---
  const getData = () => {
    axios.get('http://localhost:5038/api/SherbimiModels')
      .then((result) => {
        setData(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }


  const handleEdit = (id_S) => {
    handleShow();
    axios.get(`http://localhost:5038/api/SherbimiModels/${id_S}`)
      .then((result) => {
        const { emri,pershkrimi, stafi } = result.data;
        setEditName(emri);
        setEditPershkrimi(pershkrimi);
        setEditStafi(stafi);
        setEditId(id_S);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const handleDelete = (id_S) => {
    if (window.confirm("Are you sure you want to delete this service?") == true) {
      axios.delete(`http://localhost:5038/api/SherbimiModels/${id_S}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success('Service deleted successfully!');
            getData(); // Refresh the data after successful deletion
          }
        })
        .catch((error) => {
          toast.error('Error deleting service');
          console.error('Error deleting service:', error);
        });
    }
  }


  const handleUpdate = () => {
    if (!editName || !editPershkrimi || !editStafi) {//validimi
      toast.error('Please fill in all fields.');
      return;
    }
    const url = `http://localhost:5038/api/SherbimiModels/${editId}`;
    const data = {
      "id_S": editId,
      "Emri": editName,
      "Pershkrimi": editPershkrimi,
      "Stafi": editStafi
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
        console.error('Error adding servise:', error);
      });
  }


  const handleSave = () => {
    if (!name || !pershkrimi || !stafi) {
      toast.error('Please fill in all fields.');
      return;
    }
    const url = "http://localhost:5038/api/SherbimiModels";
    const data = {
      "Emri": name,
      "Pershkrimi": pershkrimi,
      "Stafi": stafi
    };
    axios.post(url, data)
      .then((result) => {
        handleCloseSub();
        getData();
        clear();
        toast.success('Service added successfully!');
      })
      .catch((error) => {
        toast.error('Error adding service');
        console.error('Error adding service:', error);
      });
  };


  const clear = () => {
    setName('');
    setPershkrimi('');
    setStafi('');
    setEditName('');
    setEditPershkrimi('');
    setEditStafi('');
  }
  const userRole = localStorage.getItem('role'); // Make sure the role is stored in localStorage during login
  
  if (userRole !== 'admin') {
    return <h2>Unauthorized: You do not have access to this page.</h2>;
  }

  return (
    
   <Fragment>
      <h1 style={{ textAlign: 'center', color:' rgb(86, 168, 86)'}}>Sherbimi</h1>
      <ToastContainer />
      <Container className="mt-5">
        <Row className="text-center">
          <Col>
            <Button variant="outline-success" onClick={handleShowSub}>Add Sherbimin</Button>
          </Col>
        </Row>
      </Container>
      <Modal show={showSub} onHide={handleCloseSub}>
        <Modal.Header closeButton>
          <Modal.Title>Add Sherbimin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='text' className="form-control" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type='text' className="form-control mt-3" placeholder="Enter Pershkrimin" value={pershkrimi} onChange={(e) => setPershkrimi(e.target.value)} />
          <input type='text' className="form-control mt-3" placeholder="Enter Foto Url" value={stafi} onChange={(e) => setStafi(e.target.value)} />
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
              <th>Name /Title</th>
              <th>Pershkrimi</th>
              <th>Foto url</th>
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
                      <td>{item.pershkrimi}</td>
                      <td>{item.stafi}</td>
                      <td>
                        <Button variant="success" onClick={() => handleEdit(item.id_S)}>Edit</Button> &nbsp;
                        <Button variant="outline-light" onClick={() => handleDelete(item.id_S)}>Delete</Button>
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
          <Modal.Title>Modify/update Services</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            <input type='text' className="form-control" placeholder="Enter Name" value={editName} onChange={(e) => setEditName(e.target.value)} />
          </Col><br />
          <Col>
            <input type='text' className="form-control" placeholder="Enter pershkrimi" value={editPershkrimi} onChange={(e) => setEditPershkrimi(e.target.value)} />
          </Col><br />
          <Col>
            <input type='text' className="form-control" placeholder="Enter Foto url" value={editStafi} onChange={(e) => setEditStafi(e.target.value)} />
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
export default ServCrud;
