import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/DashBoard';
import Diagnostic from './components/Diagnostic';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/diagnostic" element={<Diagnostic />} />
      </Routes>
    </Router>
  );
}

export default App;
