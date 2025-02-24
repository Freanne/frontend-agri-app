// // import { useState } from "react";
// // import api from "@/services/api";
// // import { RegisterData } from "@/types/auth";
// // import { useAuthContext } from "@/context/AuthContext";
// // import { toast } from 'react-toastify';

// // export const useRegister = () => {
// //   const [loading, setLoading] = useState(false);
// //   const { setToken, setUser } = useAuthContext();
 

// //   const register = async (data: RegisterData) => {
// //     setLoading(true);
// //     try {
// //       const response = await api.post("/register", data);
// //       setToken(response.data.token);
// //       setUser(response.data.user)
// //       // Notification de succès
// //       toast.success('Inscription réussie ! Bienvenue sur la plateforme 🎉');
// //     } catch (error: any) {
// //       console.error(error);

// //       // Notification d'erreur
// //       toast.error(error.response?.data?.message || 'Une erreur est survenue');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return { register, loading };
// // };



// // import axios from 'axios';
// // import { useRouter } from 'next/navigation';

// // export const useLogin = () => {
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const router = useRouter();
  
// //   const login = async (userData: { email: string; password: string }) => {
// //     setLoading(true);
// //     setError(null);
    
// //     try {

// //             // Récupère le jeton CSRF depuis le meta tag
// //       const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

// //       const response = await api.post('/login', userData,
// //         {
// //           headers: {
// //             "X-CSRF-TOKEN": csrfToken, // Inclure le jeton CSRF dans les en-têtes
// //           },
// //         }
// //       );
// //       console.log(response.data)
// //       // Remplace l'URL avec l'API de ton back-end
// //       const { token } = response.data;
      
// //       // Sauvegarde du token dans le localStorage ou cookies
// //       localStorage.setItem('auth_token', token); 
      
// //       // Rediriger l'utilisateur après une connexion réussie
// //       router.push('/dashboard-farmer'); // Redirige vers le tableau de bord
// //     } catch (err) {
// //       console.error("Erreur lors de la connexion: ", err);
// //       setError('Email ou mot de passe incorrect');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
  
// //   return { login, loading, error };
// // };

// import { useState } from "react";
// import api from "@/services/api";
// import { RegisterData } from "@/types/auth";
// import { useAuthContext } from "@/context/AuthContext";
// import { toast } from "react-toastify";
// import { useCsrfToken } from "@/hooks/useCsrfToken";

// export const useRegister = () => {
//   const [loading, setLoading] = useState(false);
//   const { setUser } = useAuthContext(); // Plus besoin de setToken

//   const register = async (data: RegisterData) => {
//     setLoading(true);
//     try {
//       // Récupérer le token CSRF avant de faire l'inscription
//     await useCsrfToken();

//       // Envoyer la requête d'inscription
//       const response = await api.post("/register", data);

//       setUser(response.data.user); // Stocker l'utilisateur dans le contexte

//       // Notification de succès
//       toast.success("Inscription réussie ! Bienvenue sur la plateforme 🎉");
//     } catch (error: any) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Une erreur est survenue");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { register, loading };
// };

// import api from "@/services/api";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// export const useLogin = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();
//   const { setUser, setToken } = useAuthContext(); // Plus besoin de token

//   const getCsrfToken = async () => {
//     await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
//       withCredentials: true, // Assure que les cookies sont envoyés
//     });
//   };
//   const login = async (userData: { email: string; password: string }) => {
//     setLoading(true);
//     setError(null);

//     try {
//       // Récupérer le token CSRF avant de faire le login
//       // await useCsrfToken();
//       await getCsrfToken();
//       const response = await api.post("/login", userData);
//       console.log(response.data.user)
//       setToken(response.data.token);
//       setUser(response.data.user); // Stocker l'utilisateur dans le contexte

//       toast.success("Connexion réussie !");

//       // Redirection après connexion
//       router.push("/dashboard-farmer");
//     } catch (err: any) {
//       console.error("Erreur lors de la connexion: ", err);
//       setError(err.response?.data?.message || "Email ou mot de passe incorrect");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { login, loading, error };
// };



// // hooks/useAuth.ts
// export const useAuth = () => {
//   const router = useRouter();
  
//   const checkAuth = () => {
//     const token = localStorage.getItem('auth_token');
//     if (!token) {
//       router.push('/login'); // Redirige si le token n'est pas présent
//     }
//   };
  
//   return { checkAuth };
// };
