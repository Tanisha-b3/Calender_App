const Dashboard1 = ({ isGuest }) => {
  return (
    <div className={`min-h-screen p-6 ${isGuest ? 'bg-gray-100' : 'bg-green-100'} flex items-center justify-center`}>
      <div className={`bg-white p-6 rounded-lg shadow-md w-full max-w-md ${isGuest ? 'border border-gray-300' : ''}`}>
        <h1 className="text-3xl font-bold text-center mb-4">
          Welcome to the User Dashboard
        </h1>
        {isGuest ? (
          <p className="text-center text-gray-600">
            You are logged in as a guest. Limited functionality available.
          </p>
        ) : (
          <p className="text-center text-gray-600">
            You are logged in with full access.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard1;
