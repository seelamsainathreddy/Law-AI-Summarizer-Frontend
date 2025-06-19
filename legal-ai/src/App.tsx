import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { LoginForm } from "./pages/LoginForm";
import { RegistrationForm } from "./pages/RegistrationFrom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import type { JSX } from "react";
import LandingPage from "./pages/LandingPage";
import { Dashboard } from "./components/Dashboard";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/legal-ai" replace />;
}

function PublicRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user ? <Navigate to="/home" replace /> : children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

        <Route path="/" element={<Navigate to="/legal-ai" replace />} />


        <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* Landing page at root */}
          <Route
            path="/legal-ai"
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          />
          {/* Private home page */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          {/* Login */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
            }
          />
          {/* Register */}
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegistrationForm />
              </PublicRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
