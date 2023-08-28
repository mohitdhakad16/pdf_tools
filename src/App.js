import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PdfState from './context/pdf/PdfState';

function App() {
  return (
    <PdfState>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </PdfState>

  );
}

export default App;
