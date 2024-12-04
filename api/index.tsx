// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://localhost:8000/api/',
// });

// export const getPosts = async () => {
//     const response = await api.get('posts/');
//     return response.data;
// };

// utils/axiosConfig.ts

// utils/axiosConfig.ts

import axios from 'axios';

// Créer une instance Axios
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // URL de base de ton API Django
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // si tu veux envoyer les cookies avec chaque requête
});

// Ajouter le token aux headers de chaque requête si présent
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request URL:', config.url);
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Gérer les erreurs globalement
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Exemple de gestion d'erreur : redirection si non autorisé
    if (error.response?.status === 401) {
      console.log('Non autorisé, redirection vers la page de connexion');
      // Redirection ou autre action ici (par exemple window.location.href = '/login';)
    }

    if (error.response?.status === 500) {
      console.log('Erreur serveur, merci de réessayer plus tard');
      // Afficher un message d'erreur global ou autre
    }

    return Promise.reject(error); // Propager l'erreur pour pouvoir la gérer localement aussi
  }
);

export default axiosInstance;
