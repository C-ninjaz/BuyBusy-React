import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/firebaseConfig';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const ordersRef = collection(db, 'userOrders', user.uid, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, () => setLoading(false));
    return unsub;
  }, [user]);

  if (!user) return <div>Please login to see orders</div>;
  if (loading) return <div style={{textAlign:'center'}}><PuffLoader/></div>;

  return (
    <div style={{padding:20}}>
      <h2>Your Orders</h2>
      {orders.length === 0 ? <div>No orders yet</div> : (
        orders.map(order => (
          <div key={order.id} className="order-card">
            <div><strong>Order:</strong> {order.id}</div>
            <div><strong>Date:</strong> {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleString() : '—'}</div>
            <div><strong>Total:</strong> ₹{order.total}</div>
            <ul>
              {order.items.map(it => <li key={it.productId}>{it.title} x {it.qty} — ₹{it.price}</li>)}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
