// src/pages/Home.tsx
import React from 'react';
import { UploadArea } from "@/components/UploadArea";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Home: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Header section centered */}
      <div className="w-full max-w-5xl mx-auto mb-6">
        <div className="flex justify-between items-center">
          <Link to="/legal-ai">
            <h1 className="text-3xl font-bold text-green-700 hover:underline">
              Legal AI Summarizer
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            {user && <span className="text-sm text-gray-600">Hi, {user.email}</span>}
            <Link to="/dashboard">
              <Button variant="secondary">Summaries</Button>
            </Link>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <UploadArea />
    </div>
  );
};

export default Home;
