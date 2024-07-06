
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = window.localStorage.getItem('user');
      if (!storedUser && router.pathname !== '/login') {
        router.push('/login');
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('user');
    }
    router.push('/login');
  };

  const user = typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('user'));

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link href="/" className="nav-link">Home</Link>
        {user && <Link href="/cart" className="nav-link">Cart</Link>}
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <span className="nav-username">{user}</span>
            <button onClick={handleLogout} className="nav-link lgbtn">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className="nav-link">Login</Link>
            <Link href="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
