import axios from 'axios';

// Use the .env variable
const API_BASE = process.env.REACT_APP_API_URL;

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE,
});

export const fetchRoutes = (params = {}) =>
  api.get('/routes', { params });

export const fetchRouteStops = (id: number) =>
  api.get(`/routes/${id}/stops`);

export const searchStops = (name: string) =>
  api.get('/stops/search', { params: { name } });

