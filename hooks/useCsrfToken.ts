import { useState } from 'react';
import axios from 'axios';
import api from '@/services/api';

export const useCsrfToken = () => {
  const [token, setToken] = useState<string | null>(null);

  const fetchCsrfToken = async () => {
    try {
      const response = await axios.get("http://localhost:8000/sanctum/csrf-cookie");  // Remplace par l'URL qui te donne le CSRF token
      setToken(response.data.token);  // On suppose que le token se trouve dans `response.data.token`
    } catch (error) {
      console.error('Erreur lors de la récupération du token CSRF:', error);
    }
  };

  return { fetchCsrfToken, token };
};


