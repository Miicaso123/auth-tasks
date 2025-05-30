import React from 'react';

interface MyButtonProps {
  name: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const MyButton: React.FC<MyButtonProps> = ({ name, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="p-2 mt-2 rounded-2xl bg-gray-400 text-white hover:bg-pink-500 transition-colors duration-200 cursor-pointer">
      {name}
    </button>
  );
};

export default MyButton;
