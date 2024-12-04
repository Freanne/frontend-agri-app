// import React from 'react'

// const Signin = () => {
//   return (
//     <div className='flex items-center justify-center h-screen'>
//       <div className='max-w-xl w-full mx-auto p-12 border rounded-lg '>
//         <h1 className='text-center mb-4 text-xl font-bold'>CONNEXION</h1>
//         <form action="" method="get">

//           <input 
//             type="text"
//             className='border w-full p-2 mb-4 bg-'
//             placeholder="Entrez votre nom d'utilisateur"
//           />
//           <input 
//             type='email'
//             className='border w-full p-2 mb-4'
//             placeholder="Entrez votre mail"
//           />
//           <input 
//             type='text'
//             className='border w-full p-2 mb-4'
//             placeholder="Entrez votre numéro"
//           />
//           <button type="submit" className='w-full p-2 bg-green-500 text-white'>
//             Se connecter
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Signin

'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(''); // Réinitialiser l'erreur

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/login/', formData);
      console.log('Token:', response.data.access);
      // Stocker le token dans localStorage ou un cookie
      localStorage.setItem('accessToken', response.data.access);
      router.push('/'); // Rediriger vers une autre page après la connexion
    } catch (error) {
      console.error(error);
      setErrorMessage('Nom d\'utilisateur ou mot de passe incorrect.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-green-50">
    <div className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-green-700 text-center mb-6">Connectez-vous</h2>
      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
            Email
          </label>
          <input
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            type="text"
            name="username"
            onChange={handleInputChange}
            placeholder="Entrez votre nom d'utilisateur"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            type="password"
            name="password"
            onChange={handleInputChange}
            placeholder="Entrez votre mot de passe"
            required
          />
        </div>

        <div className="flex items-end justify-end">
          <button
            className="bg-green-500 w-full mt-4 hover:bg-green-700 text-lg text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            type="submit"
          >
            Se connecter
          </button>
        </div>
        <div className='flex items-center justify-center gap-4 mt-4'>
          <p>Vous n&apos;avez pas encore de compte ?</p> 
          <Link href="/signup" className='text-green-600 font-bold'>S&apos;inscrire</Link>
        </div>
      </form>
    </div>
  </div>
  );
};

export default Login;
