// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import { useAuth } from '@/context/AuthContext';

// type Farmer = {
   
//         id: number,
//         last_name: string,
//         first_name: string,
//         phone: string,
//         ifu: string,
//         email: string,
//         email_verified_at: string | null,
//         user_type: string,
//         created_at: string,
//         updated_at: string,
    
// };

// interface FarmersListProps {
//     onSelectExpert: (expert: Farmer | null) => void;
//   }
// const FarmerList: React.FC<FarmersListProps> = ({ onSelectExpert })=> {
//   const [farmers, setFarmers] = useState<Farmer[]>([]);
//    const { user } =useAuth()
//   const router = useRouter();
//   useEffect(() => {
//     const fetchFarmers = async () => {
//       try {
//         const token = localStorage.getItem('auth_token');
//         console.log(user?.id)
//         const res = await axios.get(`http://localhost:8000/api/consultations/${user?.id}/farmers`, {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         });
//         setFarmers(res.data);
//         console.log(res.data)
//       } catch (error) {
//         console.error("Erreur lors de la récupération des agriculteurs", error);
//       }
//     };
  
//     fetchFarmers();
//   }, []);

//   return (
// <div className="flex flex-col p-4">
//   <h2 className="text-lg font-bold">🌱 Agriculteurs ayant envoyé des messages</h2>

//   {farmers.length === 0 ? (
//         <p className="text-center text-gray-500">Aucun agriculteur disponible pour le moment.</p>
//       ) : (
//   <ul className="mt-4 space-y-2">
//     {farmers.map((farmer) => (
//       <li
//         key={farmer.id}
//         onClick={() => onSelectExpert(farmer)}
//         className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-300"
//         // onClick={() => router.push(`/consultation/${farmer.id}`)} // Redirige vers la conversation
//       >
//         {farmer.last_name}
//       </li>
//     ))}
//   </ul>
//     )}
// </div>
//   );
// };

// export default FarmerList;

// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import { useAuth } from '@/context/AuthContext';

// type Farmer = {
//     id: number,
//     last_name: string,
//     first_name: string,
//     phone: string,
//     ifu: string,
//     email: string,
//     email_verified_at: string | null,
//     user_type: string,
//     created_at: string,
//     updated_at: string,
// };

// interface FarmersListProps {
//     onSelectFarmers: (expert: Farmer | null) => void;
// }

// const FarmerList: React.FC<FarmersListProps> = ({ onSelectFarmers }) => {
//   const [farmers, setFarmers] = useState<Farmer[]>([]);
//   const { user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     const fetchFarmers = async () => {
//       if (!user?.id) {
//         console.error("User not authenticated");
//         return;
//       }

//       try {
//         const token = localStorage.getItem('auth_token');
//         console.log(user?.id);
//         const res = await axios.get(`http://localhost:8000/api/experts/${user.id}/farmers`, {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         });
//         setFarmers(res.data);  // Utilisation de res.data directement
//         console.log(res.data);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des agriculteurs", error);
//       }
//     };

//     fetchFarmers();
//   }, [user?.id]);  // Dépendance sur user.id pour éviter les appels inutiles

//   useEffect(() => {
//     if (!onSelectFarmers) return;
  
//     const fetchConsultationId = async () => {
//       try {
//         const token = localStorage.getItem('auth_token');
//         const res = await axios.get(`http://localhost:8000/api/consultations/${farmer.id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         });
//         const consultationId = res.data.consultationId;  // Assure-toi que l'ID de la consultation est dans la réponse
//         router.push(`/consultation/${consultationId}`);
//       } catch (error) {
//         console.error("Erreur lors de la récupération de l'ID de consultation", error);
//       }
//     };
  
//     fetchConsultationId();
//   }, [onSelectFarmers]);
//   return (
//     <div className="flex flex-col p-4">
//       <h2 className="text-lg font-bold">🌱 Agriculteurs ayant envoyé des messages</h2>

//       {farmers.length === 0 ? (
//         <p className="text-center text-gray-500">Aucun agriculteur disponible pour le moment.</p>
//       ) : (
//         <ul className="mt-4 space-y-2">
//           {farmers.map((farmer) => (
//             <li
//               key={farmer.id}
//               onClick={() => onSelectFarmers(farmer)}
//               className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-300"
//             >
//               {farmer.last_name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default FarmerList;

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

type Farmer = {
    id: number,
    last_name: string,
    first_name: string,
    phone: string,
    ifu: string,
    email: string,
    email_verified_at: string | null,
    user_type: string,
    created_at: string,
    updated_at: string,
};

interface FarmersListProps {
    onSelectFarmers: (expert: Farmer | null) => void;
}

const FarmerList: React.FC<FarmersListProps> = ({ onSelectFarmers }) => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);  // Ajout de l'état local pour le fermier sélectionné
  const { user } = useAuth();
  const router = useRouter();

  // Récupération des agriculteurs
  useEffect(() => {
    const fetchFarmers = async () => {
      if (!user?.id) {
        console.error("User not authenticated");
        return;
      }

      try {
        const token = localStorage.getItem('auth_token');
        console.log(user?.id);
        const res = await axios.get(`http://localhost:8000/api/experts/${user.id}/farmers`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setFarmers(res.data);  // Utilisation de res.data directement
        console.log(res.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des agriculteurs", error);
      }
    };

    fetchFarmers();
  }, [user?.id]);  // Dépendance sur user.id pour éviter les appels inutiles

  // Gérer la sélection du fermier
  const handleSelectFarmer = async (farmer: Farmer) => {
    setSelectedFarmer(farmer);  // Mémoriser le fermier sélectionné
    console.log(farmer.id)
    try {
      const token = localStorage.getItem('auth_token');
      const res = await axios.get(`http://localhost:8000/api/farmers/${farmer.id}/consultations/expert/${user?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const consultationId = res.data.id;  
      console.log(consultationId)// Assure-toi que l'ID de la consultation est dans la réponse
      if (consultationId) {
        router.push(`/dashboard/expert/${consultationId}`);

      } else {
        console.error("Consultation ID introuvable.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'ID de consultation", error);
    }
  };

  return (
    <div className="flex flex-col p-4">
      <h2 className="text-lg font-bold">🌱 Agriculteurs ayant envoyé des messages</h2>

      {farmers.length === 0 ? (
        <p className="text-center text-gray-500">Aucun agriculteur disponible pour le moment.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {farmers.map((farmer) => (
            <li
              key={farmer.id}
              onClick={() => handleSelectFarmer(farmer)}  // Appeler la fonction handleSelectFarmer lors de la sélection
              className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-300"
            >
              {farmer.last_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FarmerList;
