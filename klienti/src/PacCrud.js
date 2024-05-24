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



const PacCrud = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowSub = () => setShowSub(true);
  const handleCloseSub = () => setShowSub(false);
  

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [gjinia, setGjinia] = useState('');
  const [surname, setSurName] = useState('');
  const [ankesa, setAnkesa] = useState('');
  const [NumriTel, setNumriTel] = useState('');
  

  //edit form
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editSurname, setEditSurname] = useState('');
  const [editGjinia, setEditGjinia] = useState('');
  const [editAnkesa, setEditAnkesa] = useState('');
  const [editNumriTel, setEditNumriTel] = useState('');


  useEffect(() => {
    getData();
  }, []);

  //---
  const getData = () => {
    axios.get('http://localhost:5038/api/PacientiModels')
      .then((result) => {
        setData(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  // Basic email validation using regex
//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

  
  

  const handleEdit = (id_P) => {
    handleShow();
    axios.get(`http://localhost:5038/api/PacientiModels/${id_P}`)
      .then((result) => {
        const { emri,mbiemri ,  dataELindjes, NumriTel , gjinia , ankesa } = result.data;
        setEditName(emri);
        setEditSurname(mbiemri);
        setEditDate(dataELindjes);
        setEditNumriTel(NumriTel);
        setEditGjinia(gjinia);
        setEditAnkesa(ankesa);
        setEditId(id_P);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const handleDelete = (id_P) => {
    if (window.confirm("Are you sure you want to delete this doctor?") == true) {
      axios.delete(`http://localhost:5038/api/PacientiModels/${id_P}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success('Pacienti deleted successfully!');
            getData(); // Refresh the data after successful deletion
          }
        })
        .catch((error) => {
          toast.error('Error deleting Pacienti');
          console.error('Error deleting doctor:', error);
        });
    }
  }


  const handleUpdate = () => {
    if (!editName || !editDate || !editGjinia || !editAnkesa || !editNumriTel || !editSurname) {//validimi
      toast.error('Please fill in all fields.');
      return;
    }

//validimi
    const url = `http://localhost:5038/api/PacientiModels/${editId}`;
    const data = {
      "ID_P": editId,
      "Emri": editName,
      "Mbiemri": editSurname,
      "DataELindjes": editDate,
      "NumriTel": editNumriTel,
      "Gjinia": editGjinia,
      "Ankesa": editAnkesa,
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
        console.error('Error adding pacienti:', error);
      });
  }


  // const handleSave = () => {
  //   if (!name || !surname || !data || !NumriTel || !ankesa || !gjinia) {
  //     toast.error('Please fill in all fields.');
  //     return;
  //   }
   
  //   const url = "http://localhost:5038/api/PacientiModels";
  //   const data = {
  //     "Emri": name,
  //     "Mbiemri": surname,
  //     "DataELindjes": date,
  //     "NumriTel":NumriTel,
  //     "gjinia": gjinia,
  //     "ankesa": ankesa,
  //   };
  //   axios.post(url, data)
  //     .then((result) => {
  //       handleClose();
  //       getData();
  //       clear();
  //       toast.success('Pacienti added successfully!');
  //     })
  //     .catch((error) => {
  //       toast.error('Error adding pacienti');
  //       console.error('Error adding pacienti:', error);
  //     });
  // };
  const handleSave = () => {
    if (!name || !surname || !date || !NumriTel || !ankesa || !gjinia) {
      toast.error('Please fill in all fields.');
      return;
    }
     
    const url = "http://localhost:5038/api/PacientiModels";
    const newPacientiData = {
      "Emri": name,
      "Mbiemri": surname,
      "DataELindjes": date,
      "NumriTel": NumriTel,
      "gjinia": gjinia,
      "ankesa": ankesa,
    };
    
    axios.post(url, newPacientiData)
      .then((result) => {
        handleClose();
        getData();
        clear();
        toast.success('Pacienti added successfully!');
      })
      .catch((error) => {
        toast.error('Error adding pacienti');
        console.error('Error adding pacienti:', error);
      });
  };
  


  const clear = () => {
    setName('');
    setDate('');
    setSurName('');
    setNumriTel('');
    setGjinia('');
    setAnkesa('');
    setEditName('');
    setEditDate('');
    setEditSurname('');
    setEditNumriTel('');
    setEditGjinia('');
    setEditAnkesa('');
  }
  

  return (
    
   <Fragment>
      <h1 style={{ textAlign: 'center', color:' rgb(86, 168, 86)' }}>Pacienti</h1>
      <ToastContainer />
      <Container className="mt-5">
        <Row className="text-center">
          <Col>
            <Button variant="outline-success" onClick={handleShowSub}>Add Pacienti</Button>
          </Col>
        </Row>
      </Container>
      <Modal show={showSub} onHide={handleCloseSub}>
        <Modal.Header closeButton>
          <Modal.Title>Add Pacienti</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
         
         
         
          <input type='text' className="form-control" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type='text' className="form-control mt-3" placeholder="Enter Surname" value={surname} onChange={(e) => setSurName(e.target.value)} />
          <input type='date' className="form-control mt-3" value={date} onChange={(e) => setDate(e.target.value)} />
          <input type='number' className="form-control mt-3" placeholder="Enter NumriTel" value={NumriTel} onChange={(e) => setNumriTel(parseInt(e.target.value))} />
          <select
                                id="gjiniaSelect"
                                className="form-control"
                                value={gjinia}
                                onChange={(e) => setGjinia(e.target.value)}
                                >
                                <option value="" disabled>
                                    Enter Gjinia
                                </option>
                                <option value="femer">Femer</option>
                                <option value="mashkull">Mashkull</option>
                                </select>
                                <input type='text' className="form-control" placeholder="Enter Ankesa" value={ankesa} onChange={(e) => setAnkesa(e.target.value)} />
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
              <th>Name</th>
              <th>Surname</th>
              <th>Date</th>
              <th>NumriTel</th>
              <th>Gjinia</th>
              <th>Ankesa</th>
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
                      <td>{item.mbiemri}</td>
                      <td>{item.dataELindjes}</td>
                      <td>{item.numriTel}</td>
                      <td>{item.gjinia}</td>
                      <td>{item.ankesa}</td>
                      <td>
                        <Button variant="success" onClick={() => handleEdit(item.id_P)}>Edit</Button> &nbsp;
                        <Button variant="outline-light" onClick={() => handleDelete(item.id_P)}>Delete</Button>
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
          <Modal.Title>Modify/update Pacienti</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            <input type='text' className="form-control" placeholder="Enter Name" value={editName} onChange={(e) => setEditName(e.target.value)} />
          </Col><br />
          <Col>
            <input type='text' className="form-control" placeholder="Enter Surname" value={editSurname} onChange={(e) => setEditSurname(e.target.value)} />
          </Col><br />
           <Col>
            <input type='date' className="form-control" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
          </Col><br />
          {/*  <Col >
            <DatePicker selected={date} onChange={date => setEditDate(date)} className="form-control" />
          </Col> */ }
          <Col>
            <input type='int' className="form-control" placeholder="Enter NumriTel" value={editNumriTel} onChange={(e) => setEditNumriTel(parseInt(e.target.value))} />
          </Col><br />
          <Col> <select
                        id="gjiniaSelect"
                        className="form-control"
                        value={editGjinia}
                        onChange={(e) => setEditGjinia(e.target.value)}
                    >
                        <option value="" disabled>
                            Enter Gjinia
                        </option>
                        <option value="femer">Femer</option>
                        <option value="mashkull">Mashkull</option>
                    </select>
                    </Col><br />
          <Col>
            <input type='text' className="form-control" placeholder="Enter Ankesa" value={editAnkesa} onChange={(e) => setEditAnkesa(e.target.value)} />
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


export default PacCrud;

