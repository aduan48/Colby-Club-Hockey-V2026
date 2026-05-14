import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Schedule from './pages/Schedule'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App"> 
      <Router>
        <Navbar />
        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path = "/home" element={<Home />} />
          <Route path = "/contact" element={<Home />} />
          <Route path = "/about" element ={<Home />} />
          <Route path = "/schedule" element = {<Schedule />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
