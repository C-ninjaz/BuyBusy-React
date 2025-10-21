import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from './AuthContext';

const ProductsContext = createContext();
export const useProducts = () => useContext(ProductsContext);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    setLoadingProducts(true);
    const productsRef = collection(db, 'products');
    const q = query(productsRef, orderBy('createdAt', 'desc'));
    let firstLoad = true;
    const unsub = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      if (firstLoad) {
        setLoadingProducts(false);
        firstLoad = false;
      }
    }, (err) => {
      toast.error('Failed to load products');
      setLoadingProducts(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!user) { setCart([]); return; }
    setCartLoading(true);
    const cartRef = collection(db, 'usersCarts', user.uid, 'myCart');
    const unsub = onSnapshot(cartRef, (snap) => {
      setCart(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setCartLoading(false);
    }, (err) => {
      toast.error('Failed to load cart');
      setCartLoading(false);
    });
    return unsub;
  }, [user]);

  const addToCart = async (product) => {
    if (!user) { toast.info('Please login'); return; }
    setCartLoading(true);
    try {
      const existing = cart.find((c) => c.productId === product.id);
      if (existing) {
        const docRef = doc(db, 'usersCarts', user.uid, 'myCart', existing.id);
        await updateDoc(docRef, { qty: existing.qty + 1 });
      } else {
        const cartItem = {
          productId: product.id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl || product.image,
          qty: 1,
          addedAt: serverTimestamp(),
        };
        await addDoc(collection(db, 'usersCarts', user.uid, 'myCart'), cartItem);
      }
      toast.success('Added to cart');
    } catch (err) {
      toast.error(err.message);
      throw err;
    } finally {
      setCartLoading(false);
    }
  };

  const removeFromCart = async (cartItemId) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'usersCarts', user.uid, 'myCart', cartItemId));
      toast.info('Removed from cart');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const changeQty = async (cartItemId, newQty) => {
    if (!user) return;
    try {
      const docRef = doc(db, 'usersCarts', user.uid, 'myCart', cartItemId);
      if (newQty <= 0) {
        await deleteDoc(docRef);
      } else {
        await updateDoc(docRef, { qty: newQty });
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const placeOrder = async () => {
    if (!user) { toast.info('Please login'); return; }
    setCartLoading(true);
    try {
      const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
      const orderDoc = { items: cart, total, createdAt: serverTimestamp() };
      await addDoc(collection(db, 'userOrders', user.uid, 'orders'), orderDoc);
      for (const item of cart) {
        await deleteDoc(doc(db, 'usersCarts', user.uid, 'myCart', item.id));
      }
      toast.success('Order placed successfully');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setCartLoading(false);
    }
  };

  return (
    <ProductsContext.Provider value={{
      products, loadingProducts,
      cart, cartLoading,
      addToCart, removeFromCart, changeQty, placeOrder
    }}>
      {children}
    </ProductsContext.Provider>
  );
}
