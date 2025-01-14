import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import './TechnicalGlitches.css'; 

const TechnicalGlitches = () => {
    const [deviceId, setDeviceId] = useState('');
    const [issueType, setIssueType] = useState(''); 
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');

        try {
            const response = await axios.post('http://localhost:5000/report-technical-glitch', {
                device_id: deviceId,
                issue_type: issueType,
                description,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMessage(response.data.message);
            setErrorMessage('');
            
            setDeviceId('');
            setIssueType('');
            setDescription('');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('Error reporting technical glitch.');
            }
            setMessage('');
        }
    };

    return (
        <Container className="container">
            <Typography variant="h4">Report a Technical Glitch</Typography>
            <Typography variant="body1">
                If you're experiencing issues like double deductions or your toll device not working, please provide the details below.
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField 
                    label="Device ID" 
                    fullWidth 
                    value={deviceId} 
                    onChange={(e) => setDeviceId(e.target.value)} 
                    margin="normal" 
                    required 
                />
                <TextField 
                    label="Issue Type" 
                    fullWidth 
                    value={issueType} 
                    onChange={(e) => setIssueType(e.target.value)} 
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

                <Button type="submit" variant="contained" color="primary">
                    Report Issue
                </Button>
            </form>

            {message && <Typography className="success-message">{message}</Typography>}
            {errorMessage && <Typography className="error-message">{errorMessage}</Typography>}
        </Container>
    );
};

export default TechnicalGlitches;
