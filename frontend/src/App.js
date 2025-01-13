import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Register from './components/Register';
import Help from './components/Help';
import Profile from './components/Profile';
import Logout from './components/Logout';
import WelcomeSection from './components/WelcomeSection';


import LostDevice from './components/LostDevice';
import TechnicalGlitches from './components/TechnicalGlitches';
import UnauthorizedCars from './components/UnauthorizedCars';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={{ display: 'flex', height: '100vh' }}>
          
          <Sidebar loggedIn={isLoggedIn} />
          <Box
            sx={{
              marginLeft: isLoggedIn ? '240px' : '0', 
              padding: '20px',
              height: '100%',
              overflow: 'auto',
            }}
          >
            <Routes>
              <Route path="/" element={<WelcomeSection />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/help" element={<Help />} />
              <Route path="/profile" element={<Profile />} />
              
              <Route path="/lost-device" element={<LostDevice />} />
              <Route path="/technical-glitches" element={<TechnicalGlitches />} />
              <Route path="/unauthorized-cars" element={<UnauthorizedCars />} />
           
             
              <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
            </Routes>
          </Box>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
