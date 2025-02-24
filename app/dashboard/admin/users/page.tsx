// pages/admin/users.tsx
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_type: string;
}

const UsersPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  // Récupération du token stocké après connexion
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

  useEffect(() => {
    if (!token) {
      router.push('/signin');
      return;
    }
    axios
      .get('http://localhost:8000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials:true,
      })
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Erreur lors du chargement des utilisateurs');
        setLoading(false);
      });
  }, [token, router]);

  const handleUpdate = (userId: number) => {
    // Redirige vers la page d'édition de l'utilisateur
    router.push(`/admin/users/${userId}/edit`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des Utilisateurs</h1>
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && (
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nom</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.first_name} {user.last_name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.user_type}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => handleUpdate(user.id)}
                  >
                    Modifier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersPage;
