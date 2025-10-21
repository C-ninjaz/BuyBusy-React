import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../store/slices/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate('/');
    }
    // error is handled in Redux state
  };

  return (
    <div className="login-container">
      <form onSubmit={onSubmit} className="login-card">
        <h2>Login</h2>
        <input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type='submit' disabled={status==='loading'}>Login</button>
        {error && <div style={{color:'red', marginTop:8}}>{error}</div>}
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <span style={{ color: '#888', fontSize: '1rem' }}>Don't have an account? </span>
          <Link to="/register" style={{ color: '#6c47ff', fontWeight: 600, textDecoration: 'none' }}>Sign Up</Link>
        </div>
      </form>
    </div>
  );
}
