import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import { useAuth } from './contexts/AuthContext';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Register from './pages/Register';

function PrivateRoute({ children }) {
  const { user, authLoading } = useAuth();
  if (authLoading) return <div>Checking auth...</div>;
  return user ? children : <Navigate to='/login' />;
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path='/orders' element={<PrivateRoute><Orders /></PrivateRoute>} />
      </Routes>
      <ToastContainer position='top-right' />
    </Router>
  );
}
