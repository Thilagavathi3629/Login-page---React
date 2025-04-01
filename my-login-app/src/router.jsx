import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import App from './App.jsx';
import HomePage from './routes/home';
import PhotosPage from './routes/photos.jsx';
import { fetchPhotos } from './utils/api.js';

const rootRoute = createRootRoute({
  notFoundComponent: () => <div>Page Not Found</div>,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/', 
  component: App,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/home',
  component: HomePage,
});

const photoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/photos',
  loader: async () => {
    console.log('Loading photos route');
    const photos = await fetchPhotos(); // Fetch photos from the API
    return { photos }; // Return the fetched photos
  },
  component: PhotosPage,
});

export const routeTree = rootRoute.addChildren([loginRoute, homeRoute, photoRoute]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent', // Optional: helps with preloading
  defaultNotFoundComponent: () => <div>Page Not Found</div>,
});