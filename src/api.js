import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-auth-backend-0mek.onrender.com/api", // ton backend
});

export default api;
