import React, { useState, useEffect } from 'react';

const AdminModule = ({ isGuest }) => {
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
  const [methodSearchTerm, setMethodSearchTerm] = useState('');

  useEffect(() => {
    const savedCompanies = JSON.parse(localStorage.getItem('companies'));
    if (savedCompanies) {
      setCompanies(savedCompanies);
    }

    const savedMethods = JSON.parse(localStorage.getItem('methods'));
    if (savedMethods) {
      setMethods(savedMethods);
    }
  }, []);

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

    let updatedCompanies;
    if (editingCompanyIndex !== null) {
      updatedCompanies = companies.slice();
      updatedCompanies[editingCompanyIndex] = companyForm;
      setEditingCompanyIndex(null);
    } else {
      updatedCompanies = [...companies, companyForm];
    }

    setCompanies(updatedCompanies);
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));
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
    setCompanyForm(companies[index]);
    setEditingCompanyIndex(index);
  };

  const deleteCompany = (index) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      const updatedCompanies = companies.filter((_, i) => i !== index);
      setCompanies(updatedCompanies);
      localStorage.setItem('companies', JSON.stringify(updatedCompanies));
    }
  };

  const saveMethod = () => {
    if (!methodForm.name || !methodForm.description || !methodForm.sequence) {
      alert('Please fill out all required fields.');
      return;
    }

    let updatedMethods;
    if (editingMethodIndex !== null) {
      updatedMethods = methods.slice();
      updatedMethods[editingMethodIndex] = methodForm;
      setEditingMethodIndex(null);
    } else {
      updatedMethods = [...methods, methodForm];
    }

    setMethods(updatedMethods);
    localStorage.setItem('methods', JSON.stringify(updatedMethods));
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
    setMethodForm(methods[index]);
    setEditingMethodIndex(index);
  };

  const deleteMethod = (index) => {
    if (window.confirm('Are you sure you want to delete this method?')) {
      const updatedMethods = methods.filter((_, i) => i !== index);
      setMethods(updatedMethods);
      localStorage.setItem('methods', JSON.stringify(updatedMethods));
    }
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMethods = methods.filter(method =>
    method.name.toLowerCase().includes(methodSearchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Admin Module</h2>

      {/* Role-based content */}
      <div className="text-center text-xl text-gray-600 mb-6">
        <h4>{!isGuest ? 'Role: Admin' : 'Role: Guest'}</h4>
      </div>

      {/* Search for Companies */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search companies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Company Management */}
      {!isGuest ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-2xl font-semibold mb-4">Company Management</h3>
          <form className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Company Name"
              value={companyForm.name}
              onChange={handleCompanyInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={companyForm.location}
              onChange={handleCompanyInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn Profile"
              value={companyForm.linkedin}
              onChange={handleCompanyInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="emails"
              placeholder="Emails"
              value={companyForm.emails}
              onChange={handleCompanyInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="phoneNumbers"
              placeholder="Phone Numbers"
              value={companyForm.phoneNumbers}
              onChange={handleCompanyInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <textarea
              name="comments"
              placeholder="Comments"
              value={companyForm.comments}
              onChange={handleCompanyInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <select
              name="periodicity"
              value={companyForm.periodicity}
              onChange={handleCompanyInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="1 week">1 week</option>
              <option value="2 weeks">2 weeks</option>
              <option value="1 month">1 month</option>
            </select>
            <button
              type="button"
              onClick={saveCompany}
              className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              {editingCompanyIndex !== null ? 'Update Company' : 'Add Company'}
            </button>
          </form>

          {/* List of Companies */}
          <ul className="mt-6">
            {filteredCompanies.map((company, index) => (
              <li key={index} className="bg-white p-4 mb-4 border border-gray-300 rounded-lg">
                <div className="text-xl font-semibold">{company.name} ({company.location})</div>
                <div className="mt-2">
                  <button
                    onClick={() => editCompany(index)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCompany(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-2xl font-semibold mb-4">You are logged in as a guest</h3>
          <ul className="mt-6">
            {filteredCompanies.map((company, index) => (
              <li key={index} className="bg-white p-4 mb-4 border border-gray-300 rounded-lg">
                <div className="text-xl font-semibold">{company.name} ({company.location})</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Search for Methods */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search methods"
          value={methodSearchTerm}
          onChange={(e) => setMethodSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Method Management */}
      {!isGuest ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-2xl font-semibold mb-4">Method Management</h3>
          <form className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Method Name"
              value={methodForm.name}
              onChange={handleMethodInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={methodForm.description}
              onChange={handleMethodInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              name="sequence"
              placeholder="Sequence"
              value={methodForm.sequence}
              onChange={handleMethodInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <label className="block">
              <input
                type="checkbox"
                name="mandatory"
                checked={methodForm.mandatory}
                onChange={handleMethodInputChange}
                className="mr-2"
              />
              Mandatory
            </label>
            <button
              type="button"
              onClick={saveMethod}
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {editingMethodIndex !== null ? 'Update Method' : 'Add Method'}
            </button>
          </form>

          {/* List of Methods */}
          <ul className="mt-6">
            {filteredMethods.map((method, index) => (
              <li key={index} className="bg-white p-4 mb-4 border border-gray-300 rounded-lg">
                <div className="text-xl font-semibold">{method.name}</div>
                <div className="mt-2">
                  <div className="text-gray-500">{method.description}</div>
                  <div className="text-gray-500">Sequence: {method.sequence}</div>
                  <div className="text-gray-500">Mandatory: {method.mandatory ? 'Yes' : 'No'}</div>
                </div>
                <div className="mt-2">
                  <button
                    onClick={() => editMethod(index)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMethod(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-2xl font-semibold mb-4">You are logged in as a guest</h3>
          <ul className="mt-6">
            {filteredMethods.map((method, index) => (
              <li key={index} className="bg-white p-4 mb-4 border border-gray-300 rounded-lg">
                <div className="text-xl font-semibold">{method.name}</div>
                <div className="mt-2">
                  <div className="text-gray-500">{method.description}</div>
                  <div className="text-gray-500">Sequence: {method.sequence}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminModule;
