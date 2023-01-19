import axios from 'axios';

 // const API = axios.create({ baseURL: 'http://localhost:5000' });
 const API = axios.create({ baseURL: 'https://collegeera-server-v9vm.onrender.com' });

export const uploadImg = (data) => API.post('/upload/', data);

export const uploadPost = (data) => API.post('/post/', data);