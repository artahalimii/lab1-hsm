import React, { useState } from 'react';

const ReservationModal = ({ onClose, onSubmit }) => {
    const [reservationDate, setReservationDate] = useState('');
    const [reservationTime, setReservationTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ reservationDate, reservationTime });
    };

    return (
        <div>
            <h2>Make a Reservation</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Date:
                    <input type="date" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} />
                </label>
                <label>
                    Time:
                    <input type="time" value={reservationTime} onChange={(e) => setReservationTime(e.target.value)} />
                </label>
                <button type="submit">Submit Reservation</button>
                <button onClick={onClose}>Close</button>
            </form>
        </div>
    );
};

export default ReservationModal;
