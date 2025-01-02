import React, { useState } from "react";
// import "./styles.css";
// import "./Dashboard.css";

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: "",
    communications: [],
  });
  const [newCommunication, setNewCommunication] = useState({
    companyName: "",
    type: "",
    date: "",
    notes: "",
  });

  // Add New Company
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
    setNewCompany({ name: "", communications: [] });
    alert("Company added successfully!");
  };

  // Log New Communication
  const handleAddCommunication = () => {
    if (
      !newCommunication.companyName ||
      !newCommunication.type ||
      !newCommunication.date ||
      !newCommunication.notes
    ) {
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

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add New Company</h3>
        <input
          type="text"
          value={newCompany.name}
          onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
          placeholder="Company Name"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />
        <button
          onClick={handleAddCompany}
          className="w-full p-3 rounded-lg text-white bg-red-500"
        >
          Add Company
        </button>
      </div>

    
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Log New Communication</h3>
        <form>
          <select
            value={newCommunication.companyName}
            onChange={(e) =>
              setNewCommunication({ ...newCommunication, companyName: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          >
            <option value="">Select Company</option>
            {companies.map((company, index) => (
              <option key={index} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>
          <select
            value={newCommunication.type}
            onChange={(e) =>
              setNewCommunication({ ...newCommunication, type: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
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
            value={newCommunication.date}
            onChange={(e) =>
              setNewCommunication({ ...newCommunication, date: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />
          <textarea
            placeholder="Notes"
            value={newCommunication.notes}
            onChange={(e) =>
              setNewCommunication({ ...newCommunication, notes: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />
          <button
            type="button"
            onClick={handleAddCommunication}
            className="w-full bg-red-500 text-white py-3 rounded-lg"
          >
            Log Communication
          </button>
        </form>
      </div>

      {/* Company Dashboard */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Company Dashboard</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Company Name</th>
              <th className="px-4 py-2 text-left">Last 5 Communications</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{company.name}</td>
                <td className="px-4 py-2">
                  {company.communications.slice(-5).map((comm, i) => (
                    <div key={i}>
                      <span className="block">
                        {comm.type} ({comm.date}): {comm.notes}
                      </span>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
