import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import MyModal from '../components/ui/MyModal';
import MyForm from '../components/ui/MyForm';
import { useAuthStore } from '../store/useAuthStore';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await register(email, password);
      console.log('Зарегистрирован:', user, email);
      navigate('/login');
    } catch (error) {
      alert('Ошибка регистрации');
    }
  };

  return (
    <MyModal
      title="Регистрация"
      mover={
        <p>
          Уже есть аккаунт?{' '}
          <Link to="/login" className="text-pink-500 underline">
            Войти
          </Link>
        </p>
      }>
      <MyForm
        email={email}
        password={password}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={handleRegister}
        buttonText="Зарегистрироваться"
      />
    </MyModal>
  );
};

export default Register;
