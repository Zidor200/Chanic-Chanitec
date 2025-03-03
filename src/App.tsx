import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import OrgChart from './components/OrgChart';
import Facteur from './pages/Facteur';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Organigramme
          </Button>
          <Button color="inherit" component={Link} to="/facteur">
            Facteur
          </Button>
        </Box>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <OrgChart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/facteur"
            element={
              <ProtectedRoute>
                <Facteur />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;