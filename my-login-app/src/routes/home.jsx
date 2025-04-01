// src/routes/home.jsx
import React from 'react';
import { useNavigate, useRouter } from '@tanstack/react-router';

const HomePage = () => {
  const navigate = useNavigate(); // Initialize the navigate hook
  const router = useRouter(); // Access the router instance

  // Prefetch the /photos route when the user hovers over the button
  const handlePrefetch = () => {
    router.prefetch({ to: '/photos' }); // Prefetch data for the /photos route
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0b0b2a] text-white">
      <div className="text-center">
        <h1 className="text-3xl mb-6">Welcome Home!</h1>
        <button
          onMouseEnter={handlePrefetch} // Trigger prefetching on hover
          onClick={() => navigate({ to: '/photos' })} // Navigate to the /photos page
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-md"
        >
          Go to Photos
        </button>
        <br></br>
        {/* Optional: a logout button to go back to the login page */}
        <button 
          onClick={() => navigate({ to: '/' })} // Navigate back to the login page
          className="mt-4 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
