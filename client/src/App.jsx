import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Wallet from './components/Wallet';
// import Vehicle from './components/Vehicle';
import Signup from './pages/Signup';
import DashboardPage from './pages/DashboardPage';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/wallet" element={<Wallet />} />
        {/* <Route path="/vehicles" element={<Vehicle />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default App;