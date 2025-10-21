import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addToCart, changeQty, removeFromCart } from '../store/slices/cartSlice';

export default function ProductCard({ product, cartItem }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const location = useLocation();
  const onCartPage = location.pathname === '/cart';

  const handleAddToCart = () => {
    if (!user) return alert('Please login to add to cart');
    dispatch(addToCart({ uid: user.uid, product }));
  };
  const handleRemoveFromCart = () => {
    if (!user) return;
    dispatch(removeFromCart({ uid: user.uid, cartItemId: cartItem.id }));
  };
  const handleChangeQty = (newQty) => {
    if (!user) return;
    dispatch(changeQty({ uid: user.uid, cartItemId: cartItem.id, newQty }));
  };

  return (
    <div className='product-card'>
      <img src={product.imageUrl || product.image} alt={product.title} style={{width: '100%', height: 180, objectFit: 'cover', borderRadius: 6}} />
      <h3>{product.title}</h3>
      <p>₹{product.price}</p>
      {!onCartPage && (
        <button onClick={handleAddToCart}>Add to Cart</button>
      )}
      {onCartPage && cartItem && (
        <div style={{display:'flex', gap:8, alignItems:'center', marginTop:8}}>
          <button onClick={() => handleChangeQty(cartItem.qty - 1)}>-</button>
          <span>{cartItem.qty}</span>
          <button onClick={() => handleChangeQty(cartItem.qty + 1)}>+</button>
          <button onClick={handleRemoveFromCart}>Remove</button>
        </div>
      )}
    </div>
  );
}
