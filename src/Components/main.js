import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import "./styles.css";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg-peixpAtOjyNsz7JL1ROCWW5JjAeiPM",
  authDomain: "calender-app-2e519.firebaseapp.com",
  projectId: "calender-app-2e519",
  storageBucket: "calender-app-2e519.firebasestorage.app",
  messagingSenderId: "902381813565",
  appId: "1:902381813565:web:ebb3638a6f9135c44b4f54",
  measurementId: "G-9SFFN5K87L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Auth

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: "",
    communications: [],
    nextCommunication: { type: "", date: "" },
  });
  const [newCommunication, setNewCommunication] = useState({
    companyName: "",
    type: "",
    date: "",
    notes: "",
  });

  // Google Authentication Handler
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setIsAuthenticated(true);
      console.log("User Logged In:", result.user);
    } catch (error) {
      console.error("Login error: ", error);
      alert("Login failed. Please try again.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    signOut(auth);
    setIsAuthenticated(false);
    setUser(null);
  };

  // Add a new company
  const handleAddCompany = () => {
    if (!newCompany.name.trim()) {
      alert("Please enter a valid company name.");
      return;
    }

    const existingCompany = companies.find(
      (company) =>
        company.name.trim().toLowerCase() === newCompany.name.trim().toLowerCase()
    );

    if (existingCompany) {
      alert("Company already exists.");
      return;
    }

    setCompanies([...companies, newCompany]);
    setNewCompany({ name: "", communications: [], nextCommunication: { type: "", date: "" } });
    alert("Company added successfully!");
  };

  // Log new communication for a selected company
  const handleAddCommunication = () => {
    if (!newCommunication.companyName || !newCommunication.type || !newCommunication.date || !newCommunication.notes) {
      alert("Please fill in all fields.");
      return;
    }

    const updatedCompanies = companies.map((company) => {
      if (company.name === newCommunication.companyName) {
        company.communications.push({
          type: newCommunication.type,
          date: newCommunication.date,
          notes: newCommunication.notes,
        });
      }
      return company;
    });

    setCompanies(updatedCompanies);
    setNewCommunication({
      companyName: "",
      type: "",
      date: "",
      notes: "",
    });
    alert("Communication logged successfully!");
  };

  // Handle selecting companies for communication logging
  const handleCompanyChange = (e) => {
    setNewCommunication({ ...newCommunication, companyName: e.target.value });
  };

  // Login Form (visible if not authenticated)
  if (!isAuthenticated) {
    return (
      <div className="login-form">
        <h2>Login with Google</h2>
        <button onClick={handleLogin}>Login with Google</button>
      </div>
    );
  }

  // User Dashboard
  return (
    <div>
      <h2>User Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      {/* Add New Company Form */}
      <div className="section">
        <h3>Add New Company</h3>
        <input
          type="text"
          value={newCompany.name}
          onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
          placeholder="Company Name"
        />
        <button onClick={handleAddCompany}>Add Company</button>
      </div>

      {/* Log New Communication Form */}
      <div className="section">
        <h3>Log New Communication</h3>
        <form>
          <select
            value={newCommunication.companyName}
            onChange={handleCompanyChange}
          >
            <option value="">Select Company</option>
            {companies.map((company, index) => (
              <option key={index} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>
          <select
            name="type"
            value={newCommunication.type}
            onChange={(e) =>
              setNewCommunication({ ...newCommunication, type: e.target.value })
            }
          >
            <option value="">Select Communication Type</option>
            <option value="LinkedIn Post">LinkedIn Post</option>
            <option value="LinkedIn Message">LinkedIn Message</option>
            <option value="Email">Email</option>
            <option value="Phone Call">Phone Call</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="date"
            name="date"
            value={newCommunication.date}
            onChange={(e) =>
              setNewCommunication({ ...newCommunication, date: e.target.value })
            }
          />
          <textarea
            name="notes"
            placeholder="Notes"
            value={newCommunication.notes}
            onChange={(e) =>
              setNewCommunication({ ...newCommunication, notes: e.target.value })
            }
          />
          <button type="button" onClick={handleAddCommunication}>
            Log Communication
          </button>
        </form>
      </div>

      {/* Dashboard Table */}
      <h3>Company Dashboard</h3>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Last 5 Communications</th>
            <th>Next Scheduled Communication</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={index}>
              <td>{company.name}</td>
              <td>
                {company.communications.slice(-5).map((comm, i) => (
                  <div key={i} className="communication">
                    <span>{comm.type} ({comm.date})</span>
                  </div>
                ))}
              </td>
              <td>
                {company.communications.length > 0
                  ? `${company.communications[company.communications.length - 1].type} (${company.communications[company.communications.length - 1].date})`
                  : "No communication scheduled"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
