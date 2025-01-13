import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import './UnauthorizedCars.css'; 

const UnauthorizedCars = () => {
    const [vehicleId, setVehicleId] = useState(''); 
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState(''); 
    const [timestamp, setTimestamp] = useState(new Date().toISOString().slice(0, 16)); 
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');

        try {
            const response = await axios.post('http://localhost:5000/report-unauthorized-car', {
                vehicle_id: vehicleId,
                description,
                location,
                timestamp,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMessage(response.data.message);
            setErrorMessage('');
            
            setVehicleId('');
            setDescription('');
            setLocation('');
            setTimestamp(new Date().toISOString().slice(0, 16)); 
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('Error reporting unauthorized car.');
            }
            setMessage('');
        }
    };

    return (
        <Container className="container">
            <Typography variant="h4">Report an Unauthorized Car</Typography>
            <Typography variant="body1">
                If you have spotted an unauthorized vehicle in the toll lane, please provide the details below.
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField 
                    label="Vehicle ID" 
                    fullWidth 
                    value={vehicleId} 
                    onChange={(e) => setVehicleId(e.target.value)} 
                    margin="normal" 
                    required 
                />
                <TextField 
                    label="Location" 
                    fullWidth 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    margin="normal" 
                    required 
                />
                <TextField 
                    label="Description" 
                    fullWidth 
                    multiline 
                    rows={4} 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    margin="normal" 
                />
                <TextField 
                    label="Timestamp" 
                    type="datetime-local" 
                    fullWidth 
                    value={timestamp} 
                    onChange={(e) => setTimestamp(e.target.value)} 
                    margin="normal" 
                />

                <Button type="submit" variant="contained" color="primary">
                    Report Unauthorized Car
                </Button>
            </form>

            {message && <Typography className="success-message">{message}</Typography>}
            {errorMessage && <Typography className="error-message">{errorMessage}</Typography>}
        </Container>
    );
};

export default UnauthorizedCars;
