import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');  
    setIsLoggedIn(false);  
    navigate('/login');  
  };

  return (
    <div>
      <h2>Are you sure you want to logout?</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
