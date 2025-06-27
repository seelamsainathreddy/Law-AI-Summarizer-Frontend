"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  user?: { email?: string };
  onLogout?: () => void;
}

const HomeNavbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-20 bg-white/70 backdrop-blur-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
      <Link to="/legal-ai">
        <h1 className="text-2xl font-bold text-emerald-700">Legal AI</h1>
      </Link>

      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 hidden sm:inline">Hi, {user.email}</span>
          <Link to="/dashboard">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white backdrop-blur-sm shadow-md"
              size="sm"
            >
              Summaries
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={onLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="outline" size="sm">Register</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default HomeNavbar;
