const Dashboard1 = ({ isGuest }) => {
    return (
      <div>
        <h1>Welcome to the User Dashboard</h1>
        {isGuest ? (
          <p>You are logged in as a guest. Limited functionality available.</p>
        ) : (
          <p>You are logged in with full access.</p>
        )}
      </div>
    );
  };
  
  export default Dashboard1;
  