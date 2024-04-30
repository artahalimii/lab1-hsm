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
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';


const InfCrud = () => {
            const [data, setData] = useState([]);
            const [show, setShow] = useState(false);
            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true);


            const [name, setName] = useState('');
            const [surname, setSurname] = useState('');
            const [date, setDate] = useState();
            const [email, setEmail] = useState('');
            const [numritel, setNumritel] = useState('');
            const [gjinia, setGjinia] = useState('');
            const [departamenti, setDepartamenti] = useState('');
            const [vitetpune, setVitetpune] = useState('');
            const [foto, setFoto] = useState('');

            //edit form
            const [editId, setEditId] = useState('');
            const [editName, setEditName] = useState('');
            const [editSurname, setEditSurname] = useState('');
            const [editDate, setEditDate] = useState('');
            const [editEmail, setEditEmail] = useState('');
            const [editNumritel, setEditNumritel] = useState('');
            const [editGjinia, setEditGjinia] = useState('');
            const [editDepartamenti, setEditDepartamenti] = useState('');
            const [editVitetpune, setEditVitetpune] = useState('');
            const [editFoto, setEditFoto] = useState('');

            // const empdata = useMemo(() => [
            //   {
            //     Emri: "alejna",
            //     DataELindjes: "2024",
            //     Email: "dsdsd",
            //     Specializimi:"dsd",
            //     Pervoja:"ddd",
            //     PhotoFileName:"sss"
            //   },
            //   {
            //     Emri: "alejna",
            //     DataELindjes: "2024",
            //     Email: "dsdsd",
            //     Specializimi:"dsd",
            //     Pervoja:"ddd",
            //     PhotoFileName:"sss"
            //   },
            //   {
            //     Emri: "alejna",
            //     DataELindjes: "2024",
            //     Email: "dsdsd",
            //     Specializimi:"dsd",
            //     Pervoja:"ddd",
            //     PhotoFileName:"sss"
            //   }
            // ], []);

            useEffect(() => {
                        getData();
            }, []);

            //---
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


            const handleEdit = (id_i) => {
                        handleShow();
                        axios.get(`http://localhost:5038/api/InfermjeriModels/${id_i}`)
                                    .then((result) => {
                                                const { emri, mbiemri, dataELindjes, email, numritel, gjinia, departamenti, vitetpune, photoFile } = result.data;
                                                setEditName(emri);
                                                setEditSurname(mbiemri);
                                                setEditDate(dataELindjes);
                                                setEditEmail(email);
                                                setEditNumritel(numritel);
                                                setEditGjinia(gjinia);
                                                setEditDepartamenti(departamenti);
                                                setEditVitetpune(vitetpune);
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
                        if (!editName || !editSurname || !editDate || !editEmail || !editNumritel || !editGjinia || !editDepartamenti || !editVitetpune || !editFoto) {//validimi
                                    toast.error('Please fill in all fields.');
                                    return;
                        }
                        if (!isValidEmail(editEmail)) {
                                    toast.error('Please enter a valid email address.');
                                    return;
                        }//validimi
                        const url = `http://localhost:5038/api/InfermjeriModels/${editId}`;
                        const data = {
                                    "ID_i": editId,
                                    "Emri": editName,
                                    "Mbiemri": editSurname,
                                    "DataELindjes": editDate,
                                    "Email": editEmail,
                                    "NumriTel": editNumritel,
                                    "Gjinia": editGjinia,
                                    "Departamenti": editDepartamenti,
                                    "VitetPune": editVitetpune,
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
                        if (!name || !surname || !date || !email || !numritel || !gjinia || !departamenti || !vitetpune || !foto) {//validimi
                                    toast.error('Please fill in all fields.');
                                    return;
                        }
                        if (!isValidEmail(email)) {
                                    toast.error('Please enter a valid email address.');
                                    return;
                        }//validimi
                        const url = "http://localhost:5038/api/InfermjeriModels";
                        const data = {
                                    "Emri": name,
                                    "Mbiemri": surname,
                                    "DataELindjes": date,
                                    "Email": email,
                                    "NumriTel": numritel,
                                    "Gjinia": gjinia,
                                    "Departamenti": departamenti,
                                    "VitetPune": vitetpune,
                                    "PhotoFile": foto
                        };
                        axios.post(url, data)
                                    .then((result) => {
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
                        setNumritel('');
                        setGjinia('');
                        setDepartamenti('');
                        setVitetpune('');
                        setFoto('');
                        setEditName('');
                        setEditSurname('');
                        setEditDate('');
                        setEditEmail('');
                        setEditNumritel('');
                        setEditGjinia('');
                        setEditDepartamenti('');
                        setEditVitetpune('');
                        setEditFoto('');
            }


            return (
                        <Fragment>
                                    <h1 style={{ textAlign: 'center' }}>Infermieri</h1>
                                    <ToastContainer />
                                    <Container className="mt-5">

                                                <Row>
                                                            <Col xs={12} sm={6} md={4}>
                                                                        <input type='text' className="form-control" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                                                            </Col>
                                                            <Col xs={12} sm={6} md={4}>
                                                                        <input type='text' className="form-control" placeholder="Enter Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
                                                            </Col>

                                                            {<Col xs={12} sm={6} md={4}>
                                                                        <input type='date' className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
                                                            </Col>}

                                                            <Col xs={12} sm={6} md={4}>
                                                                        <input type='text' className="form-control" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                            </Col>
                                                            <Col xs={12} sm={6} md={4}>
                                                                        <input type='text' className="form-control" placeholder="Enter NumriTel" value={numritel} onChange={(e) => setNumritel(e.target.value)} />
                                                            </Col>
                                                            <Col xs={12} sm={6} md={4}>
                                                                        <input type='text' className="form-control" placeholder="Enter Gjinia" value={gjinia} onChange={(e) => setGjinia(e.target.value)} />
                                                            </Col>
                                                            <Col xs={12} sm={6} md={4}>
                                                                        <input type='text' className="form-control" placeholder="Enter Departamenti" value={departamenti} onChange={(e) => setDepartamenti(e.target.value)} />
                                                            </Col>

                                                            <Col xs={12} sm={6} md={4}>
                                                                        <input type='number' className="form-control" placeholder="Vitet Pune" value={vitetpune} onChange={(e) => setVitetpune(parseInt(e.target.value))} />
                                                            </Col>
                                                            <Col xs={12} sm={6} md={4}>
                                                                        <input type='text' className="form-control" placeholder="Enter Foto url" value={foto} onChange={(e) => setFoto(e.target.value)} />
                                                            </Col>
                                                            <Col xs={12} sm={12} md={12} className="text-center mt-3">
                                                                        <Button variant="outline-success" onClick={() => handleSave()}>Submit</Button>
                                                            </Col>
                                                </Row>
                                    </Container>
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
                                                                                    <th>VitetPune</th>
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
                                                            {<Col xs={12} sm={6} md={4}>
                                                                        <input type='date' className="form-control" value={date} onChange={(e) => setEditDate(e.target.value)} />
                                                            </Col>}
                                                            <Col>
                                                                        <input type='text' className="form-control" placeholder="Enter Email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                                                            </Col><br />
                                                            <Col>
                                                                        <input type='text' className="form-control" placeholder="Enter NumriTel" value={editNumritel} onChange={(e) => setEditNumritel(e.target.value)} />
                                                            </Col><br />

                                                            <Col>
                                                                        <input type='text' className="form-control" placeholder="Enter Gjinia" value={editGjinia} onChange={(e) => setEditGjinia(e.target.value)} />
                                                            </Col><br />
                                                            <Col>
                                                                        <input type='text' className="form-control" placeholder="Enter Departamenti" value={editDepartamenti} onChange={(e) => setEditDepartamenti(e.target.value)} />
                                                            </Col><br />
                                                            <Col>
                                                                        <input type='number' className="form-control" placeholder="Enter vitet pune" value={editVitetpune} onChange={(e) => setEditVitetpune(parseInt(e.target.value))} />
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