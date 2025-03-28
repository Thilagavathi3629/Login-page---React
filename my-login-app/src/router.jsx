import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import App from './App.jsx';
import HomePage from './routes/home';

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

export const routeTree = rootRoute.addChildren([loginRoute, homeRoute]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent', // Optional: helps with preloading
  defaultNotFoundComponent: () => <div>Page Not Found</div>,
});