import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
import NotificationBell from "./Components/NotificationBell.jsx"; // Import NotificationBell
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

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [notifications] = useState([
    "Welcome to ConvoTrack!",
    "Your analytics are ready!",
    "New feature: Dark Mode is live!",
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? { ...currentUser, isGuest: false } : null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const handleGuestLogin = () => {
    setUser({ isGuest: true, displayName: "Guest User", photoURL: null });
  };

  const handleSignOut = async () => {
    try {
      if (user?.isGuest) {
        setUser(null);
      } else {
        await signOut(auth);
        setUser(null);
      }
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg animate-spin text-gray-700">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md transition-transform hover:scale-105">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Welcome to ConvoTrack!!
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Track and manage conversations with ease!
          </p>
          <button
            onClick={handleGoogleSignIn}
            className="btn flex items-center justify-center w-full mb-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-transform hover:scale-105"
          >
            <img className="h-6 w-6 mr-2" src={image} alt="Google Logo" />
            Sign in with Google
          </button>
          <button
            onClick={handleGuestLogin}
            className="btn w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded transition-transform hover:scale-105"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div
        className={`min-h-screen ${
          darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <header className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 shadow-md flex justify-between items-center">
          <h1 className="text-3xl font-bold">ConvoTrack</h1>
          <nav>
            <ul className="flex space-x-4 pr-10">
              <li>
                <Link to="/admin" className="hover:underline">
                  Admin
                </Link>
              </li>
              <li>
                <Link to="/user" className="hover:underline">
                  User
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:underline">
                  Analytics
                </Link>
              </li>
              <li>
                <Link to="/calender" className="hover:underline">
                  Calendar
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="hover:underline">
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
            <NotificationBell notifications={notifications} />
            <div className="relative group">
              <button className="flex items-center space-x-2 hover:underline focus:outline-none">
                <span className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-800">
                  {user.displayName[0]}
                </span>
                <span>{user.displayName}</span>
              </button>
            </div>
            <button onClick={handleSignOut} className="hover:underline">
              Sign Out
            </button>
          </div>
        </header>
        <main className="p-6">
          <Routes>
            <Route path="/user" element={<Dashboard isGuest={!!user?.isGuest} />} />
            <Route path="/" element={<Dashboard1 isGuest={!!user?.isGuest} />} />
            <Route path="/calender" element={<CalendarSection isGuest={!!user?.isGuest} />} />
            <Route path="/analytics" element={<AnalyticsDashboard isGuest={!!user?.isGuest} />} />
            <Route path="/admin" element={<AdminModule isGuest={!!user?.isGuest} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
