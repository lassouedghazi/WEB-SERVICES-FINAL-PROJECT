import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import './sidebar.css';

const Sidebar = ({ loggedIn }) => {
  return (
    <div className="sidebar">
      <List>
       
        {!loggedIn && (
          <>
            <ListItem button>
              <ListItemText>
                <Link to="/" className="sidebar-link">Welcome</Link>
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText>
                <Link to="/register" className="sidebar-link">Register</Link>
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText>
                <Link to="/login" className="sidebar-link">Login</Link>
              </ListItemText>
            </ListItem>
          </>
        )}

        
        <ListItem button>
          <ListItemText>
            <Link to="/help" className="sidebar-link">Help</Link>
          </ListItemText>
        </ListItem>

       
        {loggedIn && (
          <>
            <ListItem button>
              <ListItemText>
                <Link to="/profile" className="sidebar-link">Profile</Link>
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText>
                <Link to="/logout" className="sidebar-link">Logout</Link>
              </ListItemText>
            </ListItem>
          </>
        )}
      </List>
    </div>
  );
};

export default Sidebar;
