// 'use client';

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// interface Expert {
//   id: number;
//   name: string; 
//   speciality: string;
//   experience: string;
//   availability: string;
//   user: {
//     id:number;
//     first_name: string;/*  */
//     last_name: string;
//     email: string;
//     phone: string;
//   };
// }

// interface ExpertsListProps {
//   onSelectExpert: (expert: Expert | null) => void;
// }

// const ExpertsList: React.FC<ExpertsListProps> = ({ onSelectExpert }) => {
//   const [experts, setExperts] = useState<Expert[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     axios.get("http://localhost:8000/api/experts")
//       .then((response) => {
//         setExperts(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError("Erreur de récupération des experts.");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p className="text-center text-gray-600">Chargement des experts...</p>;
//   if (error) return <p className="text-center text-red-600">{error}</p>;

//   return (
//     <div className="p-6 bg-gray-50 rounded-lg shadow-md max-w-4xl mx-auto my-8">
//       <h2 className="text-2xl font-semibold mb-6 text-center">Experts disponibles</h2>
      
//       {experts.length === 0 ? (
//         <p className="text-center text-gray-500">Aucun expert disponible pour le moment.</p>
//       ) : (
//         <ul className="space-y-4">
//           {experts.map((expert) => (
//             <li
//               key={expert.id}
//               onClick={() => onSelectExpert(expert)}
//               className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:bg-green-100 transition-all"
//             >
//               <h3 className="text-lg font-semibold">{expert.user.first_name} {expert.user.last_name}</h3>
//               <p className="text-sm text-gray-600">Spécialité : <span className="font-medium">{expert.speciality}</span></p>
//               <p className="text-sm text-gray-600">Expérience : <span className="font-medium">{expert.experience}</span></p>
//               <p className="text-sm text-gray-600">Disponibilité : <span className="font-medium">{expert.availability}</span></p>
//               <button
//                 onClick={() => onSelectExpert(expert)}
//                 className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
//               >
//                 Sélectionner cet expert
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default ExpertsList;

'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

interface Expert {
  id: number;
  user_id:number;
  name: string; 
  speciality: string;
  experience: string;
  availability: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}

interface ExpertsListProps {
  onSelectExpert: (expert: Expert | null) => void;
}

const ExpertsList: React.FC<ExpertsListProps> = ({ onSelectExpert }) => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/experts")
      .then((response) => {
        setExperts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Erreur de récupération des experts.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div>
        <ClipLoader size={20} color="#fff" className="text-green-500" />
      </div>
    );
  if (error)
    return (
      <p className="text-center text-red-600 py-6">{error}</p>
    );

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md mx-auto my-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Experts disponibles
      </h2>

      {experts.length === 0 ? (
        <p className="text-center text-gray-500">
          Aucun expert disponible pour le moment.
        </p>
      ) : (
        // Conteneur responsive : grid sur grand écran et scroll horizontal sur mobile
        <div className="flex gap-4 overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-1">
          {experts.map((expert) => (
            <div
              key={expert.id}
              onClick={() => onSelectExpert(expert)}
              className="min-w-[280px] p-5 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:bg-green-100 transition-all flex-shrink-0"
            >
              <h3 className="text-lg font-semibold">
                {expert.user.first_name} {expert.user.last_name}
              </h3>
              <p className="text-sm text-gray-600">
                Spécialité :{" "}
                <span className="font-medium">{expert.speciality}</span>
              </p>
              <p className="text-sm text-gray-600">
                Expérience :{" "}
                <span className="font-medium">{expert.experience}</span>
              </p>
              <p className="text-sm text-gray-600">
                Disponibilité :{" "}
                <span className="font-medium">{expert.availability}</span>
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectExpert(expert);
                }}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Sélectionner cet expert
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpertsList;
