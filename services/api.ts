import axios from "axios";

// Configuration d'Axios
const api = axios.create({
  baseURL: "http://localhost:8000/api", // L'URL de ton API Laravel
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Permet d'envoyer les cookies
});



// Intercepteur pour ajouter le jeton d'authentification (si disponible)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token"); // Récupère le token d'authentification
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Ajoute le token à chaque requête
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
