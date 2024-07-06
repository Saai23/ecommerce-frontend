import { createContext, useContext, useState, useEffect } from 'react';
import API from '../utils/api';
import { useRouter } from 'next/router';

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadUserFromLocalStorage = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    loadUserFromLocalStorage();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await API.post('/login/', { username, password });
      if (response.data.message === 'Login successful') {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        router.push('/');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('Login failed. Please check your username and password.');
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await API.post('/register/', { username, email, password });
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <UserAuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserAuthContext);
