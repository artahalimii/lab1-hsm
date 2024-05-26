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
import './Navbar.css';

// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';import React, { useState } from 'react';

const InfCrud = () => {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [showSub, setShowSub] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowSub = () => setShowSub(true);
    const handleCloseSub = () => setShowSub(false);
    const [expanded, setExpanded] = useState(false);

    const handleHover = () => {
      setExpanded(!expanded);
    }

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [date, setDate] = useState();
    const [email, setEmail] = useState('');
    const [numriTel, setnumriTel] = useState('');
    const [gjinia, setGjinia] = useState('');
    const [departamenti, setDepartamenti] = useState('');
    const [vitetPune, setvitetPune] = useState('');
    const [foto, setFoto] = useState('');

    //edit form
    const [editId, setEditId] = useState('');
    const [editName, setEditName] = useState('');
    const [editSurname, setEditSurname] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editnumriTel, setEditnumriTel] = useState('');
    const [editGjinia, setEditGjinia] = useState('');
    const [editDepartamenti, setEditDepartamenti] = useState('');
    const [editvitetPune, setEditvitetPune] = useState('');
    const [editFoto, setEditFoto] = useState('');

    useEffect(() => {
        getData();
    }, []);


    const getData = () => {
        axios.get('http://localhost:5038/api/InfermjeriModels')
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
    const isValidPervoja = (vitetPune) => {
        if (vitetPune === null) {
            return true;
        }
        const pervojaRegex = /^[0-9]\d*$/;
        return pervojaRegex.test(vitetPune.toString());
    };

    const handleEdit = (id_i) => {
        handleShow();
        axios.get(`http://localhost:5038/api/InfermjeriModels/${id_i}`)
            .then((result) => {
                const { emri, mbiemri, dataELindjes, email, numriTel, gjinia, departamenti, vitetPune, photoFile } = result.data;
                setEditName(emri);
                setEditSurname(mbiemri);
                setEditDate(dataELindjes);
                setEditEmail(email);
                setEditnumriTel(numriTel);
                setEditGjinia(gjinia);
                setEditDepartamenti(departamenti);
                setEditvitetPune(vitetPune);
                setEditFoto(photoFile);
                setEditId(id_i);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const handleDelete = (id_i) => {
        if (window.confirm("Are you sure you want to delete this nurse?") == true) {
            axios.delete(`http://localhost:5038/api/InfermjeriModels/${id_i}`)
                .then((result) => {
                    if (result.status === 200) {
                        toast.success('Nurse deleted successfully!');
                        getData(); // Refresh the data after successful deletion
                    }
                })
                .catch((error) => {
                    toast.error('Error deleting nurse');
                    console.error('Error deleting nurse:', error);
                });
        }
    }


    const handleUpdate = () => {
        if (!editName || !editSurname || !editDate || !editEmail || !editnumriTel || !editGjinia || !editDepartamenti || !editFoto) {//validimi
            toast.error('Please fill in all fields.');
            return;
        }
        if (!isValidEmail(editEmail)) {
            toast.error('Please enter a valid email address.');
            return;
        }
        if (!isValidPervoja(editvitetPune)) {
            toast.error('Please enter a valid number.');
            return;
        }//validimi
        const url = `http://localhost:5038/api/InfermjeriModels/${editId}`;
        const data = {
            "ID_i": editId,
            "Emri": editName,
            "Mbiemri": editSurname,
            "DataELindjes": editDate,
            "Email": editEmail,
            "numriTel": editnumriTel,
            "Gjinia": editGjinia,
            "Departamenti": editDepartamenti,
            "vitetPune": editvitetPune,
            "PhotoFile": editFoto
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
                console.error('Error adding nurse:', error);
            });
    }


    const handleSave = () => {
        if (!name || !surname || !date || !email || !numriTel || !gjinia || !departamenti || !foto) {//validimi
            toast.error('Please fill in all fields.');
            return;
        }
        if (!isValidEmail(email)) {
            toast.error('Please enter a valid email address.');
            return;
        }
        if (!isValidPervoja(vitetPune)) {
            toast.error('Please enter a valid number.');
            return;
        }//validimi
        const url = "http://localhost:5038/api/InfermjeriModels";
        const data = {
            "Emri": name,
            "Mbiemri": surname,
            "DataELindjes": date,
            "Email": email,
            "numriTel": numriTel,
            "Gjinia": gjinia,
            "Departamenti": departamenti,
            "vitetPune": vitetPune,
            "PhotoFile": foto
        };
        axios.post(url, data)
            .then((result) => {
                handleCloseSub();
                getData();
                clear();
                toast.success('infermieri/ja u shtua');
            })
            .catch((error) => {
                // Handle error
                console.error('Error adding nurse:', error);
            });
    };


    const clear = () => {
        setName('');
        setSurname('');
        setDate('');
        setEmail('');
        setnumriTel('');
        setGjinia('');
        setDepartamenti('');
        setvitetPune('');
        setFoto('');
        setEditName('');
        setEditSurname('');
        setEditDate('');
        setEditEmail('');
        setEditnumriTel('');
        setEditGjinia('');
        setEditDepartamenti('');
        setEditvitetPune('');
        setEditFoto('');
    }


    return (
        
        <Fragment>
            <nav className="navbar">
      <div className="container">
      {/* <h1 className="navbar__logo" onMouseEnter={handleHover} onMouseLeave={handleHover}>
          {expanded ? "Hospital Management System" : "HMS"}
        </h1> */}
        <h1 className="navbar__logo" onMouseEnter={handleHover} onMouseLeave={handleHover}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhYYuts7OIowNO0D3K3WVNx9S36WxX664As8fCDTQeXg&s" alt="Logo" className="logo-image" />
          {expanded ? "ospital Management System" : ""}
        </h1>
        <ul className="navbar__list">
          <li className="navbar__item"><a href="/Doki" className="navbar__link">Doktori</a></li>
          <li className="navbar__item"><a href="/Infcrud" className="navbar__link">Infermieri</a></li>
          <li className="navbar__item"><a href="/ReservationCrud" className="navbar__link">Rezervimet</a></li>
          <li className="navbar__item"><a href="/PacCrud" className="navbar__link">Pacienti</a></li>
          <li className="navbar__item"><a href="/RekCrud" className="navbar__link">Rekordi
          </a></li>
        </ul>
      </div>
    </nav>
            
            <h1 style={{ textAlign: 'center', color:' rgb(86, 168, 86)' }}>Infermieri</h1>
            <ToastContainer />
            <Container className="mt-5">
                <Row>
                    <Col xs={12} sm={6} md={4}>
                        <Button variant="outline-success" onClick={handleShowSub} style={{ width: '150px' }}>Shto Infermieret</Button>


                    </Col>
                </Row>
            </Container>
            <Modal show={showSub} onHide={handleCloseSub}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Nurse</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type='text' className="form-control" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type='text' className="form-control mt-3" placeholder="Enter Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
                    <input type='date' className="form-control mt-3" value={date} onChange={(e) => setDate(e.target.value)} />
                    <input type='text' className="form-control mt-3" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type='text' className="form-control mt-3" placeholder="Enter numriTel" value={numriTel} onChange={(e) => setnumriTel(e.target.value)} />
                    <br /><select
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
                    <input type='text' className="form-control mt-3" placeholder="Enter Departamenti" value={departamenti} onChange={(e) => setDepartamenti(e.target.value)} />
                    <input type='number' className="form-control mt-3" placeholder="Enter Vitet Pune" value={vitetPune} onChange={(e) => setvitetPune(parseInt(e.target.value))} />
                    <input type='text' className="form-control mt-3" placeholder="Enter Foto url" value={foto} onChange={(e) => setFoto(e.target.value)} />
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
                            <th>Email</th>
                            <th>Nr-Tel</th>
                            <th>Gjinia</th>
                            <th>Departamenti</th>
                            <th>vitetPune</th>
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
                                            <td>{item.id_i}</td>
                                            <td>{item.emri}</td>
                                            <td>{item.mbiemri}</td>
                                            <td>{item.dataELindjes}</td>
                                            <td>{item.email}</td>
                                            <td>{item.numriTel}</td>
                                            <td>{item.gjinia}</td>
                                            <td>{item.departamenti}</td>
                                            <td>{item.vitetPune}</td>
                                            <td>{item.photoFile}</td>
                                            <td>
                                                <Button variant="success" onClick={() => handleEdit(item.id_i)}>Edit</Button> &nbsp;
                                                <Button variant="outline-light" onClick={() => handleDelete(item.id_i)}>Delete</Button>
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
                    <Modal.Title>Modify/update Infiermieret</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col>
                        <input type='text' className="form-control" placeholder="Enter Name" value={editName} onChange={(e) => setEditName(e.target.value)} />
                    </Col><br />
                    <Col>
                        <input type='text' className="form-control" placeholder="Enter Surname" value={editSurname} onChange={(e) => setEditSurname(e.target.value)} />
                    </Col><br />
                    <Col >
                        <input type='date' className="form-control" value={date} onChange={(e) => setEditDate(e.target.value)} />
                    </Col><br />
                    <Col>
                        <input type='text' className="form-control" placeholder="Enter Email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                    </Col><br />
                    <Col>
                        <input type='text' className="form-control" placeholder="Enter numriTel" value={editnumriTel} onChange={(e) => setEditnumriTel(e.target.value)} />
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
                        <input type='text' className="form-control" placeholder="Enter Departamenti" value={editDepartamenti} onChange={(e) => setEditDepartamenti(e.target.value)} />
                    </Col><br />
                    <Col>
                        <input type='number' className="form-control" placeholder="Enter vitet pune" value={editvitetPune} onChange={(e) => setEditvitetPune(parseInt(e.target.value))} />
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
export default InfCrud;