import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import AdminModule from "./Components/Admin.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import AnalyticsDashboard from "./Components/AnalyticsDashboard.jsx";
import CalendarSection from "./Components/Calender.jsx";
import Dashboard1 from "./Components/guest.jsx";
import "./index.css";
import image from "./assets/download.jpg";

const firebaseConfig = {
  apiKey: "AIzaSyAg-peixpAtOjyNsz7JL1ROCWW5JjAeiPM",
  authDomain: "calender-app-2e519.firebaseapp.com",
  projectId: "calender-app-2e519",
  storageBucket: "calender-app-2e519.appspot.com",
  messagingSenderId: "902381813565",
  appId: "1:902381813565:web:ebb3638a6f9135c44b4f54",
  measurementId: "G-9SFFN5K87L",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const handleGuestLogin = () => {
    setUser({ isGuest: true });
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg animate-pulse">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Welcome to ConvoTrack!
          </h2>
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-primary flex items-center justify-center w-full mb-4 bg-red-500"
          >
            <img className="h-6 w-6 mr-2" src={image} alt="Google Logo" />
            Sign in with Google
          </button>
          <button
            onClick={handleGuestLogin}
            className="btn btn-secondary w-full"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-red-500 text-white p-6 shadow-md flex justify-between items-center">
          <h1 className="text-3xl font-bold">ConvoTrack</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/admin"
                  className="text-white hover:text-yellow-300 px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/user"
                  className="text-white hover:text-yellow-300 px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/analytics"
                  className="text-white hover:text-yellow-300 px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Analytics Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/calender"
                  className="text-white hover:text-yellow-300 px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Calendar
                </Link>
              </li>
            </ul>
          </nav>
          <button
            onClick={handleSignOut}
            className="btn btn-danger px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            Sign Out
          </button>
        </header>
        <main className="p-6">
          <Routes>
            <Route
              path="/admin"
              element={
                <ProtectedRoute user={user && !user.isGuest}>
                  <AdminModule />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/analytics"
              element={
                <ProtectedRoute user={user && !user.isGuest}>
                  <AnalyticsDashboard />
                </ProtectedRoute>
              }
            /> */}
            <Route path="/user" element={<Dashboard isGuest={!!user?.isGuest} />} />
            <Route path="/" element={<Dashboard1 isGuest={!!user?.isGuest} />} />
            <Route path="/calender" element={<CalendarSection isGuest={!!user?.isGuest} />} />
            <Route path="/analytics" element={<AnalyticsDashboard isGuest={!!user?.isGuest} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
