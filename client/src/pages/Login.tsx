import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import MyModal from '../components/ui/MyModal';
import MyForm from '../components/ui/MyForm';
import { useAuthStore } from '../store/useAuthStore';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      console.log('Вошел:',user, email);
      navigate('/dashboard');
    } catch (error) {
      alert('Ошибка входа');
    }
  };

  return (
    <MyModal
      title="Вход"
      mover={
        <p>
          Нет аккаунта?{' '}
          <Link to="/" className="text-pink-500 underline">
            Зарегистрироваться
          </Link>
        </p>
      }>
      <MyForm
        email={email}
        password={password}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={handleLogin}
        buttonText="Войти"
      />
    </MyModal>
  );
};

export default Login;
