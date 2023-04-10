import axios from "axios";

const API = axios.create({ baseURL: "https://adobe-assignment-mwhv.vercel.app" });

export const logIn = (formData)=> API.post('/login',formData);

export const signUp = (formData)=> API.post('/users',formData);

