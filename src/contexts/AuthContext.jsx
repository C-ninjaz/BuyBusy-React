import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../firebase/firebaseConfig'; // Ensure the path and export are correct

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  const register = async (email, password) => {
    try {
      setAuthLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Registered successfully');
      setUser(res.user);
      return res.user;
    } catch (err) {
      toast.error(err.message);
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setAuthLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in');
      setUser(res.user);
      return res.user;
    } catch (err) {
      toast.error(err.message);
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    toast.info('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, authLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
