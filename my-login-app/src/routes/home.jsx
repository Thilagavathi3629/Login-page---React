import { useNavigate } from '@tanstack/react-router';

const HomePage = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

  return (
    <div className="h-screen flex items-center justify-center bg-[#0b0b2a] text-white">
      <div className="text-center">
        <h1 className="text-3xl mb-6">Welcome Home!</h1>
        <button 
          onClick={() => navigate({ to: '/' })} // Navigate to the root route (login page)
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
