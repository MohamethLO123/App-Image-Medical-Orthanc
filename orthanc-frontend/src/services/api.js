import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8088/api',
  headers: {
    'Content-Type': 'application/json'
  }
});
