// src/utils/api.js
export const fetchPhotos = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos');
      if (!response.ok) {
        throw new Error('Failed to fetch photos');
      }
      const data = await response.json();
      console.log('Fetched photos:', data);  // Log the fetched data to ensure it's correct
      return data;  // Return the data
    } catch (error) {
      console.error('Error fetching photos:', error);
      return [];  // Return an empty array in case of an error
    }
  };
  