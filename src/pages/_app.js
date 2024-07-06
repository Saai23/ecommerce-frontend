import Navbar from '@/components/Navbar';
import { CartProvider } from '../context/CartContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Navbar />
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
