import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
            navigate('/login'); 
            return;
        }

       
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError('Failed to fetch profile. Please try again later.');
            }
        };

        fetchUserProfile();
    }, [navigate]);

    if (error) {
        return (
            <Container>
                <Typography variant="h6" color="error">{error}</Typography>
            </Container>
        );
    }

    if (!user) {
        return (
            <Container>
                <Typography variant="h6">Loading...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
               
                <Paper className="profile-card">
                    <Typography variant="h4" gutterBottom>Profile</Typography>
                    <Typography variant="h6">User Information</Typography>
                    <Typography variant="body1"><strong>Username:</strong> {user.username}</Typography>
                    <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
                </Paper>

               
                <Paper className="help-card" onClick={() => navigate('/lost-device')}>
                    <Typography variant="h5">Lost Your Toll Device?</Typography>
                    <Typography variant="body1">
                        Uh-oh, lost your toll device? Don’t worry! If it goes missing or gets stolen,
                        just use our app to notify us about your stolen toll device.
                    </Typography>
                </Paper>

                <Paper className="help-card" onClick={() => navigate('/technical-glitches')}>
                    <Typography variant="h5">Technical Glitches</Typography>
                    <Typography variant="body1">
                        Double deduction? Or your toll device just not working? Technical glitches can be a pain,
                        but they’re fixable!
                    </Typography>
                </Paper>

                <Paper className="help-card" onClick={() => navigate('/unauthorized-cars')}>
                    <Typography variant="h5">Unauthorized Cars in Toll Lanes</Typography>
                    <Typography variant="body1">
                        Stuck behind a non-toll vehicle in the toll lane? Frustrating, right?
                    </Typography>
                </Paper>

                
            </Box>
        </Container>
    );
};

export default Profile;
