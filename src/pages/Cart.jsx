import { useEffect } from 'react';
import { useDispatch, useSelector as useReduxSelector, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { fetchCart } from '../store/slices/cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const user = useReduxSelector(state => state.auth.user);
  const { items: cart, status } = useSelector(state => state.cart);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart(user.uid));
    }
  }, [dispatch, user]);

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

  if (status === 'loading') return <div>Loading cart...</div>;

  return (
    <div style={{padding:20}}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <div>Your cart is empty</div> : (
        <>
          <div style={{display:'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap:12}}>
            {cart.map(item => (
              <ProductCard key={item.id} product={{ id: item.productId, title: item.title, price: item.price, imageUrl: item.imageUrl }} cartItem={item} />
            ))}
          </div>
          <div style={{marginTop:20}}>
            <h3>Total: ₹{total}</h3>
            <button disabled>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
}
