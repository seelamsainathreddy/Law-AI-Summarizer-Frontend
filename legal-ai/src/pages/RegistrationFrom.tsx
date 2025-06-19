import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_URL;


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Registration failed");
      }

      setSuccess(true);
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md animate-fade-in">
        <div className="text-center mb-6">
          <Link to="/legal-ai">
            <h1 className="text-3xl font-bold text-green-700 cursor-pointer hover:underline">
              Legal AI
            </h1>
          </Link>
          <p className="text-gray-500 text-sm">Create your account</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 max-w-md mx-auto p-4 animate-fade-slide-in">
          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">✅ Registration successful! Redirecting to login...</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 w-full rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 w-full rounded-md"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white p-2 w-full rounded-md hover:bg-green-700 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
