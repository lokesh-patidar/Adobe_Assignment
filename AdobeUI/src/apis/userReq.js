import axios from 'axios'


const API = axios.create({ baseURL: 'https://adobe-assignment-mwhv.vercel.app' });
API.interceptors.request.use((req)=>{
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
      }
    
      return req;
})

export const getUser = (userId) => API.get(`/users/${userId}`)

export const updateUser = (id, formData) =>  API.put(`/users/${id}`, formData);

export const getAllUser = () => API.get('/users/all')
