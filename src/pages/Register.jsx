import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../store/slices/authSlice';

export default function Register() {
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser({ email, password }));
    if (registerUser.fulfilled.match(result)) {
      navigate('/');
    }
    // error is handled in Redux state
  };

  return (
    <div className="login-container">
      <form onSubmit={onSubmit} className="login-card">
        <h2>Register</h2>
        <input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type='submit' disabled={status==='loading'}>Register</button>
        {error && <div style={{color:'red', marginTop:8}}>{error}</div>}
      </form>
    </div>
  );
}
