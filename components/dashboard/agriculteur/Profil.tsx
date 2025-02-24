'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LoadingAgriculture from '../../common/loading';

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
}

const Profil = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatedData, setUpdatedData] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        try {
          const response = await axios.get('http://localhost:8000/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          setUserData(response.data);
          setUpdatedData(response.data); // Initialise les données modifiables
        } catch (error) {
          console.error("Erreur lors de la récupération des données utilisateur:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedData((prevState) => ({
        ...prevState,
        first_name: value || '',
        last_name: value || '',
        email: value || '',
      }) as UserData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("auth_token");

    if (token && updatedData) {
      try {
        await axios.put('http://localhost:8000/api/user', updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        alert("Profil mis à jour avec succès");
      } catch (error) {
        console.error("Erreur lors de la mise à jour du profil:", error);
      }
    }
  };

  if (loading) {
    return <LoadingAgriculture />;
  }

  if (!userData || !updatedData) {
    return <div>Aucune donnée trouvée.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Mon Profil</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block">Prénom</label>
          <input
            type="text"
            name="first_name"
            value={updatedData.first_name}
            onChange={handleInputChange}
            className="border p-2 w-full mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Nom</label>
          <input
            type="text"
            name="last_name"
            value={updatedData.last_name}
            onChange={handleInputChange}
            className="border p-2 w-full mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Email</label>
          <input
            type="email"
            name="email"
            value={updatedData.email}
            onChange={handleInputChange}
            className="border p-2 w-full mt-2"
            required
          />
        </div>
        <div className="flex gap-4">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">
            Sauvegarder
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profil;
