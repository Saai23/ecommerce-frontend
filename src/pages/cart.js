import { useRouter } from 'next/router';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, dispatch } = useCart();
  const router = useRouter();

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  const checkout = () => {
    if (user) router.push('/checkout')
    else {
      alert('please login first')
      router.push('/login')
    }
  };
   const user = typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('user'));
  return (
    <div className="container cart">
      <h1>Your Cart</h1>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            <span>{item.name} - ${item.price} x {item.quantity}</span>
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <button className="clearButton" onClick={clearCart}>Clear Cart</button>
      <div onClick={()=>{checkout()}} href="/checkout">
        <span className="checkoutLink">Proceed to Checkout</span>
      </div>
    </div>
  );
};

export default Cart;
