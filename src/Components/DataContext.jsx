import React, { createContext, useState } from 'react';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [methods, setMethods] = useState([
    { name: 'LinkedIn Post', description: 'Post on LinkedIn', sequence: 1, mandatory: true },
    { name: 'LinkedIn Message', description: 'Message on LinkedIn', sequence: 2, mandatory: true },
    { name: 'Email', description: 'Send an email', sequence: 3, mandatory: true },
    { name: 'Phone Call', description: 'Call the representative', sequence: 4, mandatory: false },
    { name: 'Other', description: 'Other methods', sequence: 5, mandatory: false },
  ]);

  return (
    <DataContext.Provider value={{ companies, setCompanies, methods, setMethods }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
