import React, { useState } from 'react'; 
import '../index.css';

const AdminModule = () => {
  const [role, setRole] = useState('');
  const [companies, setCompanies] = useState([]);
  const [methods, setMethods] = useState([
    { name: 'LinkedIn Post', description: 'Post on LinkedIn', sequence: 1, mandatory: true },
    { name: 'LinkedIn Message', description: 'Message on LinkedIn', sequence: 2, mandatory: true },
    { name: 'Email', description: 'Send an email', sequence: 3, mandatory: true },
    { name: 'Phone Call', description: 'Call the representative', sequence: 4, mandatory: false },
    { name: 'Other', description: 'Other methods', sequence: 5, mandatory: false },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [companyForm, setCompanyForm] = useState({
    name: '',
    location: '',
    linkedin: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
    periodicity: '2 weeks',
  });
  const [editingCompanyIndex, setEditingCompanyIndex] = useState(null);
  const [methodForm, setMethodForm] = useState({
    name: '',
    description: '',
    sequence: '',
    mandatory: false,
  });
  const [editingMethodIndex, setEditingMethodIndex] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'admin123';

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === '') {
      setAuthError('Please select a role (admin or guest).');
      return;
    }

    if (role === 'admin') {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        setAuthError('');
        setIsAdminLoggedIn(true);
      } else {
        setAuthError('Invalid username or password for admin.');
      }
    } else if (role === 'guest') {
      setAuthError('');
    }
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setUsername('');
    setPassword('');
    setAuthError('');
    setIsAdminLoggedIn(false);
  };

  const handleCompanyInputChange = (e) => {
    setCompanyForm({ ...companyForm, [e.target.name]: e.target.value });
  };

  const handleMethodInputChange = (e) => {
    const value = e.target.name === 'mandatory' ? e.target.checked : e.target.value;
    setMethodForm({ ...methodForm, [e.target.name]: value });
  };

  const saveCompany = () => {
    if (!companyForm.name || !companyForm.location || !companyForm.emails) {
      alert('Please fill out all required fields.');
      return;
    }

    if (editingCompanyIndex !== null) {
      const updatedCompanies = companies.slice();
      updatedCompanies[editingCompanyIndex] = companyForm;
      setCompanies(updatedCompanies);
      setEditingCompanyIndex(null);
    } else {
      setCompanies([...companies, companyForm]);
    }
    resetCompanyForm();
  };

  const resetCompanyForm = () => {
    setCompanyForm({
      name: '',
      location: '',
      linkedin: '',
      emails: '',
      phoneNumbers: '',
      comments: '',
      periodicity: '2 weeks',
    });
  };

  const editCompany = (index) => {
    if (role !== 'admin') return;
    setCompanyForm(companies[index]);
    setEditingCompanyIndex(index);
  };

  const deleteCompany = (index) => {
    if (role !== 'admin') return;
    if (window.confirm('Are you sure you want to delete this company?')) {
      setCompanies(companies.filter((_, i) => i !== index));
    }
  };

  const saveMethod = () => {
    if (!methodForm.name || !methodForm.description || !methodForm.sequence) {
      alert('Please fill out all required fields.');
      return;
    }

    if (editingMethodIndex !== null) {
      const updatedMethods = methods.slice();
      updatedMethods[editingMethodIndex] = methodForm;
      setMethods(updatedMethods);
      setEditingMethodIndex(null);
    } else {
      setMethods([...methods, methodForm]);
    }
    resetMethodForm();
  };

  const resetMethodForm = () => {
    setMethodForm({
      name: '',
      description: '',
      sequence: '',
      mandatory: false,
    });
  };

  const editMethod = (index) => {
    if (role !== 'admin') return;
    setMethodForm(methods[index]);
    setEditingMethodIndex(index);
  };

  const deleteMethod = (index) => {
    if (role !== 'admin') return;
    if (window.confirm('Are you sure you want to delete this method?')) {
      setMethods(methods.filter((_, i) => i !== index));
    }
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 items-center">
      <h2 className="text-2xl font-bold flex justify-center items-center mr-4">Admin Module</h2>

      {/* Role Selection */}
      {role === '' && (
        <section className="mb-4 flex justify-center items-center">
          <h4 className="text-lg mr-4">Please select your role:</h4>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => handleRoleChange('admin')}
          >
            Admin
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => handleRoleChange('guest')}
          >
            Guest
          </button>
        </section>
      )}

      {/* Admin Login Form */}
      {role === 'admin' && !isAdminLoggedIn && (
        <section className="mb-4">
          <h4 className="text-lg">Login as Admin</h4>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 rounded mb-2 w-full"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded mb-2 w-full"
              required
            />
            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
              Login
            </button>
          </form>
          {authError && <div className="text-red-500 mt-2">{authError}</div>}
        </section>
      )}

      {/* Role-based content */}
      {role !== '' && (
        <>
          <section className="mb-4">
            <h4 className="text-lg">Role: {role === 'admin' ? 'Admin' : 'Guest'}</h4>
          </section>

          {/* Company Management (Only after Admin Login) */}
          {isAdminLoggedIn || role === 'guest' ? (
            <section className="mb-4">
              <h3 className="text-xl font-bold">Company Management</h3>
              <input
                type="text"
                placeholder="Search companies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 rounded mb-4 w-full"
              />
              {/* Add/Edit company form */}
              <form className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Company Name"
                  value={companyForm.name}
                  onChange={handleCompanyInputChange}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={companyForm.location}
                  onChange={handleCompanyInputChange}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  name="linkedin"
                  placeholder="LinkedIn Profile"
                  value={companyForm.linkedin}
                  onChange={handleCompanyInputChange}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  name="emails"
                  placeholder="Emails"
                  value={companyForm.emails}
                  onChange={handleCompanyInputChange}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  name="phoneNumbers"
                  placeholder="Phone Numbers"
                  value={companyForm.phoneNumbers}
                  onChange={handleCompanyInputChange}
                  className="border p-2 rounded w-full"
                />
                <textarea
                  name="comments"
                  placeholder="Comments"
                  value={companyForm.comments}
                  onChange={handleCompanyInputChange}
                  className="border p-2 rounded w-full"
                />
                <select
                  name="periodicity"
                  value={companyForm.periodicity}
                  onChange={handleCompanyInputChange}
                  className="border p-2 rounded w-full"
                >
                  <option value="1 week">1 week</option>
                  <option value="2 weeks">2 weeks</option>
                  <option value="1 month">1 month</option>
                </select>
                <button
                  type="button"
                  onClick={saveCompany}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  {editingCompanyIndex !== null ? 'Update Company' : 'Add Company'}
                </button>
              </form>

              {/* List of Companies */}
              <ul className="mt-4">
                {filteredCompanies.map((company, index) => (
                  <li key={index} className="border p-2 mb-2">
                    <div className="font-semibold">
                      {company.name} ({company.location})
                    </div>
                    {(role === 'admin' && isAdminLoggedIn) && (
                      <div className="mt-2">
                        <button
                          onClick={() => editCompany(index)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCompany(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <div>You must log in as an Admin to view this section.</div>
          )}

          {/* Logout Button */}
          <section className="mb-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => setRole('')}
            >
              Logout
            </button>
          </section>
        </>
      )}
    </div>
  );
};

export default AdminModule;
