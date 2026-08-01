import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import SpecularButton from '../components/SpecularButton';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
        <AlertCircle className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h1 className="text-6xl font-black text-white">404</h1>
        <h2 className="text-xl font-bold text-slate-200">Page Not Found</h2>
        <p className="text-xs text-slate-400">The requested route or simulation report path does not exist in the platform registry.</p>
      </div>

      <div className="flex justify-center pt-4">
        <SpecularButton onClick={() => navigate('/')} size="md" radius={12}>
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </SpecularButton>
      </div>
    </div>
  );
};
