import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const uploadImg = (formData) => API.post('/post', formData);