import { Button } from '@/components/ui/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NotFoundProps {
  message: string;
  image: string;
}

const NotFound: React.FC<NotFoundProps> = ({ message, image }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={image} alt="Not Found" className="mb-4 w-full max-w-lg" />
      <h1 className="text-2xl font-bold text-center">{message}</h1>
      <Button
        className="mt-10 font-bold text-lg"
        size={'lg'}
        onClick={() => navigate('/')}
      >
        Back to homepage
      </Button>
    </div>
  );
};

export default NotFound;
