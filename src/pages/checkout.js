import { useCart } from '../context/CartContext';
import API from '../utils/api';
import { useRouter } from 'next/router';

const Checkout = () => {
  const { cart, dispatch } = useCart();
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const user = typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('user'));
      const response = await API.post('/checkout/', { cart, user });
      dispatch({ type: 'CLEAR_CART' });
      alert('checkout success')
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Checkout;