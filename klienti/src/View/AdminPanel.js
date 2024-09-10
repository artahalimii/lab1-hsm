/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [stats, setStats] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [newDoctorName, setNewDoctorName] = useState('');
  const [newPatientName, setNewPatientName] = useState('');
  const [newReservationData, setNewReservationData] = useState({
    doctorId: '',
    patientId: ''
  });

  useEffect(() => {
    async function fetchData() {
      const statsResponse = await axios.get('/Admin/Index');
      setStats(statsResponse.data);

      const doctorsResponse = await axios.get('/Admin/Doctors');
      setDoctors(doctorsResponse.data);

      const patientsResponse = await axios.get('/Admin/Patients');
      setPatients(patientsResponse.data);

      const reservationsResponse = await axios.get('/Admin/Reservations');
      setReservations(reservationsResponse.data);
    }
    fetchData();
  }, []);

  const handleCreateDoctor = async e => {
    e.preventDefault();
    await axios.post('/Admin/CreateDoctor', { name: newDoctorName });
    // Refresh doctor list or show success message
  };

  const handleCreatePatient = async e => {
    e.preventDefault();
    await axios.post('/Admin/CreatePatient', { name: newPatientName });
    // Refresh patient list or show success message
  };

  const handleCreateReservation = async e => {
    e.preventDefault();
    await axios.post('/Admin/CreateReservation', newReservationData);
    // Refresh reservation list or show success message
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Number of Doctors: {stats.numberOfDoctors}</p>
      <p>Number of Patients: {stats.numberOfPatients}</p>
      <p>Number of Reservations: {stats.numberOfReservations}</p>

      <h2>Doctors</h2>
      <ul>
        {doctors.map(doctor => (
          <li key={doctor.id}>{doctor.name}</li>
        ))}
      </ul>

      <h2>Patients</h2>
      <ul>
        {patients.map(patient => (
          <li key={patient.id}>{patient.name}</li>
        ))}
      </ul>

      <h2>Reservations</h2>
      <ul>
        {reservations.map(reservation => (
          <li key={reservation.id}>{reservation.details}</li>
        ))}
      </ul>

      <h2>Create Doctor</h2>
      <form onSubmit={handleCreateDoctor}>
        <label>Name:</label>
        <input type="text" value={newDoctorName} onChange={e => setNewDoctorName(e.target.value)} />
        <button type="submit">Create</button>
      </form>

      <h2>Create Patient</h2>
      <form onSubmit={handleCreatePatient}>
        <label>Name:</label>
        <input type="text" value={newPatientName} onChange={e => setNewPatientName(e.target.value)} />
        <button type="submit">Create</button>
      </form>

      <h2>Create Reservation</h2>
      <form onSubmit={handleCreateReservation}>
        <label>Doctor:</label>
        <select value={newReservationData.doctorId} onChange={e => setNewReservationData({ ...newReservationData, doctorId: e.target.value })}>
          <option value="">Select Doctor</option>
          {doctors.map(doctor => (
            <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
          ))}
        </select>
        <label>Patient:</label>
        <select value={newReservationData.patientId} onChange={e => setNewReservationData({ ...newReservationData, patientId: e.target.value })}>
          <option value="">Select Patient</option>
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>{patient.name}</option>
          ))}
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default AdminPanel;
*/