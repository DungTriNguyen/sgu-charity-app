import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 30000,
});

const apiAuth = axios.create({
  baseURL: process.env.API_URL,
  timeout: 30000,
});

export { api, apiAuth };
