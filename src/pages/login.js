"use client";


import { useState } from 'react';
import { useRouter } from 'next/router';
import API from '../utils/api';
import Link from 'next/link';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await API.post('/login/', { username, password });
      if (response.data.message === 'Login successful') {

        window.localStorage.setItem('user', JSON.stringify(response.data.user));
        router.push('/');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
