'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'marketingrealcalcados@gmail.com' && password === 'Real2457@') {
      localStorage.setItem('adminLoggedIn', 'true');
      router.push('/admin');
    } else {
      setError('E-mail ou senha incorretos.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
          Login Admin
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-red-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-red-500 focus:outline-none"
              required
            />
          </div>
          {error && <p className="text-red-400 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}