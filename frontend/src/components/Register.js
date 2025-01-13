import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Register.css';  

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        email,
        password,
        confirm_password: confirmPassword,
      });

      if (response.data.message) {
        alert('Registration successful');
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);

      
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Error during registration');
      }
    }
  };

  return (
    <div className="register-container">
      <Box
        sx={{
          maxWidth: 400,
          margin: '0 auto',
          padding: 3,
          backgroundColor: '#2D2D2D',
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom style={{ color: '#fff' }}>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
            style={{ backgroundColor: '#444', color: '#fff' }}
          />
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            style={{ backgroundColor: '#444', color: '#fff' }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            style={{ backgroundColor: '#444', color: '#fff' }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            required
            style={{ backgroundColor: '#444', color: '#fff' }}
          />
          {errorMessage && <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ marginTop: 2 }}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#1976d2' }}>
              Login here
            </Link>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
