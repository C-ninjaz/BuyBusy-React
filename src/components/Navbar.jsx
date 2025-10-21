import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../store/slices/authSlice';
import { ModeToggle } from './ModeToggle';

function HomeIcon() {
  return <img src="https://cdn-icons-png.flaticon.com/128/1946/1946436.png" alt="Home" style={{ width: 18, height: 18 }} />;
}
function OrdersIcon() {
  return <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDQ4IiBoZWlnaHQ9IjIwNDgiIHZpZXdCb3g9IjAgMCAyMDQ4IDIwNDgiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTIwMjkgMTQ1M2wtNTU3IDU1OGwtMjY5LTI3MGw5MC05MGwxNzkgMTc4bDQ2Ny00NjZ6TTEwMjQgNjQwSDY0MFY1MTJoMzg0em0wIDI1Nkg2NDBWNzY4aDM4NHptLTM4NCAxMjhoMzg0djEyOEg2NDB6TTUxMiA2NDBIMzg0VjUxMmgxMjh6bTAgMjU2SDM4NFY3NjhoMTI4em0tMTI4IDEyOGgxMjh2MTI4SDM4NHptNzY4LTM4NFYxMjhIMjU2djE3OTJoODk2djEyOEgxMjhWMGgxMTE1bDU0OSA1NDl2NzMxbC0xMjggMTI4VjY0MHptMTI4LTEyOGgyOTNsLTI5My0yOTN6Ii8+PC9zdmc+" alt="Orders" style={{ width: 18, height: 18 }} />;
}
function CartIcon() {
  return <img src="https://cdn-icons-png.flaticon.com/128/1170/1170678.png" alt="Cart" style={{ width: 18, height: 18 }} />;
}
function LogoutIcon() {
  return <img src="https://cdn-icons-png.flaticon.com/128/1828/1828479.png" alt="Logout" style={{ width: 18, height: 18 }} />;
}

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="navbar" style={{ fontSize: 15, padding: '8px 0' }}>
      <Link to="/" className="navbar-logo" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 700, fontSize: 18 }}>Busy Buy</Link>
      <div className="navbar-links" style={{ gap: 12 }}>
        <Link to='/' className="navbar-link" style={{ fontSize: 15 }}><HomeIcon /><span style={{ marginLeft: 4 }}>Home</span></Link>
        {user ? (
          <>
            <Link to='/orders' className="navbar-link" style={{ fontSize: 15 }}><OrdersIcon /><span style={{ marginLeft: 4 }}>My orders</span></Link>
            <Link to='/cart' className="navbar-link" style={{ fontSize: 15 }}><CartIcon /><span style={{ marginLeft: 4 }}>Cart</span></Link>
            <button onClick={handleLogout} className="navbar-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 15 }}><LogoutIcon /><span style={{ marginLeft: 4 }}>Logout</span></button>
          </>
        ) : (
          <Link to='/login' className="navbar-link" style={{ fontSize: 15 }}><LogoutIcon /><span style={{ marginLeft: 4 }}>SignIn</span></Link>
        )}
        <span className="theme-toggle" style={{ marginLeft: 10, transform: 'scale(0.85)' }}><ModeToggle /></span>
      </div>
    </nav>
  );
}

export default Navbar;
