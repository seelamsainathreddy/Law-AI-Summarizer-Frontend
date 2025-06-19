import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 flex flex-col items-center justify-center text-center px-6">
      
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-green-700 mb-6 animate-fade-in-up">
        Legal AI Summarizer
      </h1>
      
      {/* Description */}
      <p className="text-lg text-gray-700 max-w-xl mb-10 animate-fade-in-up animate-delay-90">
        Instantly summarize, simplify, and analyze any legal document using cutting-edge AI. Upload your PDFs and get key insights in plain English.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 ">
        <Link to="/login">
          <Button className="px-6 py-2 text-lg">Login</Button>
        </Link>
        <Link to="/register">
          <Button variant="outline" className="px-6 py-2 text-lg">
            Register
          </Button>
        </Link>
        <Link to="/legal-ai">
          <Button variant="ghost" className="px-6 py-2 text-lg text-green-700 hover:underline">
            Try Demo
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
