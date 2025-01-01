import React, { useState } from 'react'; 
import '../index.css';

const AdminModule = () => {
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
    setCompanyForm(companies[index]);
    setEditingCompanyIndex(index);
  };

  const deleteCompany = (index) => {
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
    setMethodForm(methods[index]);
    setEditingMethodIndex(index);
  };

  const deleteMethod = (index) => {
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
            </li>
          ))}
        </ul>
      </section>

      {/* Logout Button */}
      <section className="mb-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-2"
          onClick={() => window.location.reload()}
        >
          Logout
        </button>
      </section>
    </div>
  );
};

export default AdminModule;
