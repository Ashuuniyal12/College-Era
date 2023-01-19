import axios from 'axios';

 // const API = axios.create({ baseURL: 'http://localhost:5000' });
 const API = axios.create({ baseURL: 'https://collegeera-server-v9vm.onrender.com' });

export const userChat = (id) => API.get(`/chat/${id}`);

export const createChat = (newChat) => API.post('/chat', newChat);