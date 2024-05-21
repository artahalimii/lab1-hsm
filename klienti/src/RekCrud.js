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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';


const RekCrud = () => {
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

  const [id_P, setId_P] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [diagnoza, setDiagnoza] = useState('');
  const [receta, setReceta] = useState('');
  const [rezultatet, setRezultatet] = useState('');
  const [doktori, setDoktori] = useState({});
  const [pacienti, setPacienti] = useState({});

  //edit form
  const [editId_Rek, setEditId_Rek] = useState('');
  const [editId_P, setEditId_P] = useState('');
  const [editDoctorId, setEditDoctorId] = useState('');
  const [editDiagnoza, setEditDiagnoza] = useState('');
  const [editReceta, setEditReceta] = useState('');
  const [editRezultatet, setEditRezultatet] = useState('');
  const [editDoktori, setEditDoktori] = useState({});
  const [editPacienti, setEditPacienti] = useState({});

  useEffect(() => {
    getData();
  }, []);

  //---
  const getData = () => {
    axios.get('http://localhost:5038/api/RekordModels')
      .then((result) => {
        setData(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }


 

  const handleEdit = (id_Rek) => {
    handleShow();
    axios.get(`http://localhost:5038/api/RekordModels/${id_Rek}`)
      .then((result) => {
        const { id_P, doctorId, diagnoza, receta, rezultatet,doktori,pacienti} = result.data;
        setEditId_P(id_P);
        setEditDoctorId(doctorId);
        setEditDiagnoza(diagnoza);
        setEditReceta(receta);
        setEditRezultatet(rezultatet);
        setEditDoktori(doktori);
        setEditPacienti(pacienti);
        setEditId_Rek(id_Rek);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const handleDelete = (id_Rek) => {
    if (window.confirm("Are you sure you want to delete this rekord?") == true) {
      axios.delete(`http://localhost:5038/api/RekordModels/${id_Rek}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success('Rekord deleted successfully!');
            getData(); // Refresh the data after successful deletion
          }
        })
        .catch((error) => {
          toast.error('Error deleting Rekord');
          console.error('Error deleting Rekord:', error);
        });
    }
  }


  const handleUpdate = () => {
    if (!editId_P || !editDoctorId || !editDiagnoza || !editReceta || !editRezultatet) {
      toast.error('Please fill in all fields.');
      return;
    }
    const url = `http://localhost:5038/api/RekordModels/${editId_Rek}`;
    const data = {
      "Id_Rek":editId_Rek,
      "Id_P": editId_P,
      "DoctorId": editDoctorId,
      "Diagnoza": editDiagnoza,
      "Receta": editReceta,
      "Rezultatet": editRezultatet,
      "Doktori":editDoktori,
      "Pacienti":editPacienti
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
        console.error('Error adding Rekord:', error);
      });
  }


  const handleSave = () => {
    if (!id_P || !doctorId || !diagnoza || !receta || !rezultatet ) {
      toast.error('Please fill in all fields.');
      return;
    }
    const url = "http://localhost:5038/api/RekordModels";
    const data = {
      "Id_P": id_P,
      "DoctorId": doctorId,
      "Diagnoza": diagnoza,
      "Receta": receta,
      "Rezultatet": rezultatet,
      "Doktori": doktori,
      "Pacienti":pacienti
    };
    axios.post(url, data)
      .then((result) => {
        handleCloseSub();
        getData();
        clear();
        toast.success('Rekord added successfully!');
      })
      .catch((error) => {
        toast.error('Error adding rekord');
        console.error('Error adding rekord:', error);
      });
  };


  const clear = () => {
    setId_P('');
    setDoctorId('');
    setDiagnoza('');
    setReceta('');
    setRezultatet('');
    setDoktori({});
    setPacienti({});
    setEditId_P('');
    setEditDoctorId('');
    setEditDiagnoza('');
    setEditReceta('');
    setEditRezultatet('');
    setEditDoktori({});
    setEditPacienti({});
  }
  

  return (
    
   <Fragment>
      <h1 style={{ textAlign: 'center' }}>Rekordi</h1>
      <ToastContainer />
      <Container className="mt-5">
        <Row className="text-center">
          <Col>
            <Button variant="outline-success" onClick={handleShowSub}>Add Rekordin</Button>
          </Col>
        </Row>
      </Container>
      <Modal show={showSub} onHide={handleCloseSub}>
        <Modal.Header closeButton>
          <Modal.Title>Add Rekordin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='number' className="form-control" placeholder="Enter Id pacientit" value={id_P} onChange={(e) => setId_P(parseInt(e.target.value))} />
          <input type='number' className="form-control mt-3" placeholder="Enter id docit" value={doctorId} onChange={(e) => setDoctorId(parseInt(e.target.value))} />
          <input type='text' className="form-control mt-3" placeholder="Enter Diagnoza" value={diagnoza} onChange={(e) => setDiagnoza(e.target.value)} />
          <input type='text' className="form-control mt-3" placeholder="Enter receta" value={receta} onChange={(e) => setReceta((e.target.value))} />
          <input type='text' className="form-control mt-3" placeholder="Enter rezultatet" value={rezultatet} onChange={(e) => setRezultatet(e.target.value)} />
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
              <th>Id e pacientit</th>
              <th>Id e doktorit</th>
              <th>Diagnoza</th>
              <th>Receta</th>
              <th>Rezultatet e testeve</th>
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
                     <td> <Button variant="outline-light" onClick={() => handleShowPaci(item.pacienti)}>{item.id_P}</Button>
                    </td>
                    <td>
                      <Button variant="outline-light" onClick={() => handleShowDoki(item.doktori)}>{item.doctorId}</Button>
                    </td>
                      <td>{item.diagnoza}</td>
                      <td>{item.receta}</td>
                      <td>{item.rezultatet}</td>
                      <td>
                        <Button variant="success" onClick={() => handleEdit(item.id_Rek)}>Edit</Button> &nbsp;
                        <Button variant="outline-light" onClick={() => handleDelete(item.id_Rek)}>Delete</Button>
                      </td>
                    </tr>
                  )
                })
                :
                'Loading....'
            }
          </tbody>
        </Table>

        {/* Pacienti Modal */}
      <Modal show={showPaci} onHide={handleClosePaci}>
        <Modal.Header closeButton>
          <Modal.Title>Te dhenat e pacientit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPaci && (
            <ListGroup>
              <ListGroup.Item>{selectedPaci.emri}</ListGroup.Item><br/>
              <ListGroup.Item>{selectedPaci.mbiemri}</ListGroup.Item><br/>
              <ListGroup.Item>{selectedPaci.dataELindjes}</ListGroup.Item><br/>
              <ListGroup.Item>{selectedPaci.gjinia}</ListGroup.Item><br/>
              <ListGroup.Item>{selectedPaci.numriTel}</ListGroup.Item><br/>
            </ListGroup>
          )}
        </Modal.Body>
      </Modal>

      {/* Doktori Modal */}
      <Modal show={showDoki} onHide={handleCloseDoki}>
        <Modal.Header closeButton>
          <Modal.Title>Te dhenat e doktorit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDoki && (
            <ListGroup>
              <ListGroup.Item >{selectedDoki.emri}</ListGroup.Item><br/>
              <ListGroup.Item>{selectedDoki.dataELindjes}</ListGroup.Item><br/>
              <ListGroup.Item>{selectedDoki.email}</ListGroup.Item><br/>
              <ListGroup.Item>{selectedDoki.specializimi}</ListGroup.Item><br/>
              <ListGroup.Item>{selectedDoki.photoFileName}</ListGroup.Item><br/>
            </ListGroup>
          )}
        </Modal.Body>
      </Modal>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify/update Rekordin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            <input type='number' className="form-control" placeholder="Enter id e pacientit" value={editId_P} onChange={(e) => setEditId_P(parseInt(e.target.value))} />
          </Col><br />
          <Col>
            <input type='number' className="form-control" placeholder="Enter id e doc" value={editDoctorId} onChange={(e) => setEditDoctorId(parseInt(e.target.value))} />
          </Col><br />
          <Col>
            <input type='text' className="form-control" placeholder="Enter diagnozen" value={editDiagnoza} onChange={(e) => setEditDiagnoza(e.target.value)} />
          </Col><br />
          <Col>
            <input type='text' className="form-control"placeholder="Enter receta" value={editReceta} onChange={(e) => setEditReceta(e.target.value)} />
          </Col><br />
          <Col>
            <input type='text' className="form-control" placeholder="Enter rezultatet" value={editRezultatet} onChange={(e) => setEditRezultatet(e.target.value)} />
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


export default RekCrud;

