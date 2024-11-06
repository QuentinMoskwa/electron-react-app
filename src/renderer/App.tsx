import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './DashBoard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

