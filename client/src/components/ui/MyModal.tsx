import React, { type ReactNode } from 'react';

interface ModalProps {
  title: string;
  children?: ReactNode;
  mover: ReactNode;
}

const MyModal: React.FC<ModalProps> = ({ title, children, mover }) => {
  return (
    <div className="p-4 max-w-md mx-auto min-h-screen flex flex-col gap-5 items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <h1 className="text-xl font-semibold mb-4 text-center">{title}</h1>
        <div className="space-y-4">{children}</div>
        <div className="mt-4">{mover}</div>
      </div>
    </div>
  );
};

export default MyModal;
