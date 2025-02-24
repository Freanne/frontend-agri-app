// 'use client'
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; 

// const Login = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const getCsrfToken = async () => {
//     try {
//       await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
//         withCredentials: true, // Assure que les cookies sont envoyés
//       });
//     } catch (error) {
//       console.error("Erreur lors de la récupération du token CSRF", error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage('');

//     // Récupérer le CSRF Token avant la requête
//     await getCsrfToken();

//     try {
//       const userData = { email, password };
//       const response = await axios.post(
//         'http://localhost:8000/api/login', 
//         userData,
//         { withCredentials: true }
//       );

//       console.log(response.data)
//       // Sauvegarder le token dans localStorage
//       localStorage.setItem("auth_token", response.data.token);

//       // Afficher le succès
//       toast.success("Connexion réussie !");
      
//       // router.push("/dashboard-farmer");

//       const userType= response.data.user.user_type

//       if(userType === 'farmer') {
//       // Redirection vers le tableau de bord
//         router.push("/dashboard-farmer");
//       } else if ( userType === 'expert') {
//         router.push("/dashboard-expert");
//       } 


//     } catch (err: any) {
//       console.error("Erreur lors de la connexion: ", err);
//       setErrorMessage(err.response?.data?.message || "Email ou mot de passe incorrect");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <div className="flex items-center justify-center min-h-[90vh] bg-green-50">
//       <div className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-2xl">
//         <h2 className="text-2xl font-bold text-green-700 text-center mb-6">Connectez-vous</h2>
//         {errorMessage && (
//           <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
//         )}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
//               Email
//             </label>
//             <input
//               className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//               type="email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Entrez votre email"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
//               Mot de passe
//             </label>
//             <input
//               className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//               type="password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Entrez votre mot de passe"
//               required
//             />
//           </div>

//           {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

//           <div className="flex items-end justify-end">
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-green-500 w-full mt-4 hover:bg-green-700 text-lg text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//             >
//               {loading ? 'Connexion...' : 'Se connecter'}
//             </button>
//           </div>

//           <div className="flex items-center justify-center gap-4 mt-4">
//             <p>Vous n&apos;avez pas encore de compte ?</p> 
//             <Link href="/signup" className="text-green-600 font-bold">S&apos;inscrire</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

'use client';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      await login(email, password);
      toast.success('Connexion réussie !');
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-green-50">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-6">Connectez-vous</h2>
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring-2 focus:ring-green-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Mot de passe</label>
            <input
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring-2 focus:ring-green-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>

          <div className="flex items-end justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 w-full mt-4 hover:bg-green-700 text-lg text-white font-bold py-2 px-4 rounded"
            >
              {loading ? (<ClipLoader size={20} color="#fff" className='font-bold'/>): ('Se connecter')}
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <p>Vous n&apos;avez pas encore de compte ?</p> 
            <Link href="/signup" className="text-green-600 font-bold">S&apos;inscrire</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
