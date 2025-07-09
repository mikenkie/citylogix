import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import RouteList from './components/RouteList';
import RouteDetails from './components/RouteDetails';
import StopSearch from './components/StopSearch';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Transit Route Planner</Typography>
          <Button color="inherit" component={Link} to="/">Routes</Button>
          <Button color="inherit" component={Link} to="/search">Stop Search</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<RouteList />} />
          <Route path="/routes/:id" element={<RouteDetails />} />
          <Route path="/search" element={<StopSearch />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;