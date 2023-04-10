import axios from "axios";

const API = axios.create({ baseURL: "https://adobe-assignment-mwhv.vercel.app" });

export const uploadImage = (data) => API.post('/upload', data);

export const uploadPost = (data) => API.post("/posts", data)