// src/pages/Home.tsx
import React from 'react';
import { UploadArea } from "@/components/UploadArea";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Legal Document Summarizer</h1>
      <UploadArea />
    </div>
  );
};

export default Home;