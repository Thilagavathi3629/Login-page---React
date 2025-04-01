import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { fetchPhotos } from '../utils/api';

const PhotosPage = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true);
        const data = await fetchPhotos();
        console.log("Photo data received:", data);
        setPhotos(data);
      } catch (err) {
        console.error("Error fetching photos:", err);
        setError("Failed to load photos");
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, []);

  const getImageUrl = (photo) => {
    if (photo.id) {
      return `https://jsonplaceholder.typicode.com/photos/${photo.id}/thumbnails`;
    }
    return `https://picsum.photos/id/${photo.id % 1000}/150/150`;
  };

  const handleImageError = (event, photo) => {
    console.error(`Image failed to load for photo ${photo.id}:`, event.target.src);
    event.target.src = `https://picsum.photos/seed/${photo.id}/150/150`;
    event.target.onerror = () => {
      event.target.src = '/api/placeholder/150/150';
      event.target.onerror = null;
    };
  };

  const filteredPhotos = photos.filter(photo => 
    photo.title?.toLowerCase().includes(filterText.toLowerCase())
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-red-500 bg-opacity-20 p-8 rounded-lg border border-red-500">
          <h2 className="text-2xl font-bold text-red-400 mb-2">Error</h2>
          <p className="text-white">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-purple-500 border-l-pink-500 border-r-indigo-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl font-medium text-gray-300">Loading your gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-indigo-900 to-purple-900 py-6 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Photo Gallery</h1>
          <div className="mt-6 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search photos..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-full py-3 px-5 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <svg 
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Gallery Section */}
      <main className="py-8 px-4 max-w-6xl mx-auto">
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No photos found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPhotos.slice(0, 30).map((photo) => (
              <div key={photo.id} className="group">
                <div className="bg-gray-800 rounded-lg overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl shadow-md">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={getImageUrl(photo)}
                      alt={photo.title}
                      onError={(e) => handleImageError(e, photo)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 text-xs text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="inline-block px-2 py-1 bg-purple-600 rounded-md">ID: {photo.id}</span>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <div className="relative overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-0.5 w-0 group-hover:w-full transition-all duration-300"></div>
                      <h3 className="py-2 font-medium text-gray-300 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
                        {photo.title || "Untitled"}
                      </h3>
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-0.5 w-0 group-hover:w-full transition-all duration-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer Section */}
      <footer className="mt-12 bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <button
              onClick={() => navigate({ to: '/' })}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg text-white font-medium hover:from-red-700 hover:to-pink-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Logout
            </button>
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PhotosPage;