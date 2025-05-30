import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import MyButton from './MyButton';

interface MyFormProps {
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  buttonText: string;
}

const MyForm: React.FC<MyFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  buttonText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full px-6 py-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-m font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={onEmailChange}
          required
          className="p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>
      <div className="flex flex-col gap-1 relative">
        <label htmlFor="password" className="text-m font-medium text-gray-700">
          Пароль
        </label>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={onPasswordChange}
          required
          className="p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <div className="absolute right-3 bottom-[5px] cursor-pointer text-gray-500 hover:text-pink-500">
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="focus:outline-none">
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
      </div>

      <MyButton name={buttonText} type="submit" />
    </form>
  );
};

export default MyForm;
