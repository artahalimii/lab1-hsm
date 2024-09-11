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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/Navbar.css';
import { getAuthHeader, decodeToken } from '../View/authService';

// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';import React, { useState } from 'react';

const InfCrud = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
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
    
    // Get token and set headers
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    
    const getAuthHeader = () => {
        return {
            'Authorization': `Bearer ${token}` // Add the Authorization header
        };
    };
    
    const getData = async () => {
        const decoded = decodeToken(token);
    
        if (!decoded) {
            setError('Token has expired or is invalid');
            return;
        }
    
        try {
            const response = await axios.get('http://localhost:5038/api/InfermjeriModels', {
                headers: getAuthHeader(),
            });
            setData(response.data);
        } catch (error) {
            setError('Failed to fetch data');
            console.error('Error fetching data:', error.response ? error.response.data : error.message);
        }
    };
    
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
        axios.get(`http://localhost:5038/api/InfermjeriModels/${id_i}`, {
            headers: getAuthHeader()
        })
        .then((result) => {
            const { emri, mbiemri, dataELindjes, email, numriTel, gjinia, departamenti, vitetPune, photoFile } = result.data;
            setEditId(id_i);
            setEditName(emri);
            setEditSurname(mbiemri);
            setEditDate(dataELindjes);
            setEditEmail(email);
            setEditnumriTel(numriTel);
            setEditGjinia(gjinia);
            setEditDepartamenti(departamenti);
            setEditvitetPune(vitetPune);
            setEditFoto(photoFile);
        })
        .catch((error) => {
            console.error('Error fetching nurse:', error.response ? error.response.data : error.message);
        });
    };
    
    const handleUpdate = () => {
        if (!editName || !editSurname || !editDate || !editEmail || !editnumriTel || !editGjinia || !editDepartamenti || !editFoto) {
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
        }
        
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
    
        axios.put(url, data, {
            headers: getAuthHeader()
        })
        .then((result) => {
            handleClose();
            getData();
            clear();
            toast.success('Update successful');
        })
        .catch((error) => {
            console.error('Error updating nurse:', error.response ? error.response.data : error.message);
        });
    };
    
    const handleDelete = (id_i) => {
        if (window.confirm("Are you sure you want to delete this nurse?")) {
            axios.delete(`http://localhost:5038/api/InfermjeriModels/${id_i}`, {
                headers: getAuthHeader()
            })
            .then((result) => {
                    getData(); 
                    toast.success('Nurse deleted successfully!');
            })
            .catch((error) => {
                toast.error('Error deleting nurse');
                console.error('Error deleting nurse:', error.response ? error.response.data : error.message);
            });
        }
    };
    
    const handleSave = () => {
        if (!name || !surname || !date || !email || !numriTel || !gjinia || !departamenti || !foto) {
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
        }
    
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
    
        axios.post(url, data, {
            headers: getAuthHeader()
        })
        .then((result) => {
            handleCloseSub();
            getData();
            clear();
            toast.success('Nurse added successfully!');
        })
        .catch((error) => {
            console.error('Error adding nurse:', error.response ? error.response.data : error.message);
            toast.error('Error adding nurse');
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
    };
    
    // Check user role
    const userRole = localStorage.getItem('role'); // Make sure the role is stored in localStorage during login
    
    if (userRole !== 'admin') {
        return <h2>Unauthorized: You do not have access to this page.</h2>;
    }
    

    return (
        
        <Fragment> 
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
                                            <td>
                                          <img 
                                           src={item.photoFile} 
                                           alt="Doctor" 
                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                                                   />
                                            </td>
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