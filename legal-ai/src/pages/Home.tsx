import React from 'react';
import { UploadArea } from "@/components/UploadArea";
import { useAuth } from '@/context/AuthContext';
import HomeNavbar from '@/components/layout/HomeNavbar';

const Home: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-4 bg-gradient-animated"> {/* pt-28 gives space for fixed nav */}
      <HomeNavbar user={user ?? undefined} onLogout={logout} />
      <UploadArea />
    </div>
  );
};

export default Home;
