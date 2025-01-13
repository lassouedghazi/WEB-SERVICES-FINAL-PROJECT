import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import './LostDevice.css'; 

const LostDevice = () => {
    const [deviceId, setDeviceId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');

        try {
            const response = await axios.post('http://localhost:5000/report-lost-device', {
                device_id: deviceId,
                first_name: firstName,
                last_name: lastName,
                national_id: nationalId,
                description,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMessage(response.data.message);
            setErrorMessage('');
          
            setDeviceId('');
            setFirstName('');
            setLastName('');
            setNationalId('');
            setDescription('');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('Error reporting lost device.');
            }
            setMessage('');
        }
    };

    return (
        <Container className="container">
            <Typography variant="h4">Lost Your Toll Device?</Typography>
            <Typography variant="body1">
                Uh-oh, lost your toll device? Please provide the details below.
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField label="Device ID" fullWidth value={deviceId} onChange={(e) => setDeviceId(e.target.value)} margin="normal" required />
                <TextField label="First Name" fullWidth value={firstName} onChange={(e) => setFirstName(e.target.value)} margin="normal" required />
                <TextField label="Last Name" fullWidth value={lastName} onChange={(e) => setLastName(e.target.value)} margin="normal" required />
                <TextField label="National ID" fullWidth value={nationalId} onChange={(e) => setNationalId(e.target.value)} margin="normal" required />
                <TextField label="Description" fullWidth multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} margin="normal" />

                <Button type="submit" variant="contained" color="primary">
                    Report Lost Device
                </Button>
            </form>

            {message && <Typography className="success-message">{message}</Typography>}
            {errorMessage && <Typography className="error-message">{errorMessage}</Typography>}
        </Container>
    );
};

export default LostDevice;
