// 'use client';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '@/context/AuthContext';

// interface Diagnostic {
//   id: number;
//   expert_id: string;
//   farmer_id: string;
//   description:string;
//   image: string;
//   status: string;
//   created_at: string;
//   image_url: string;
//     expert : {
//         id: number;
//         user_id: number;
//         speciality : string

//         user: {
//             id : number,
//             last_name : string,
//             first_name:string,
//         }
//     }
// }

// export default function DiagnosticsList() {
//   const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const { user } = useAuth();

//   useEffect(() => {
//     const fetchDiagnostics = async () => {
//       const token = localStorage.getItem('auth_token');
//       try {
//         const response = await axios.get(`http://localhost:8000/api/diagnostics/farmer/${user?.id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         });
//         setDiagnostics(response.data);
//       } catch (error) {
//         setError("Erreur lors de la récupération des diagnostics");
//       }
//     };

//     if (user) {
//       fetchDiagnostics();
//     }
//   }, [user]);

//   return (
//     <div className="lg:max-w-7xl lg:mx-auto px-4 py-6">
//       <h1 className="text-2xl font-semibold text-center mb-6">Mes Diagnostics</h1>

//       {error && <p className="text-red-500 text-center">{error}</p>}

//       <div className="space-y-4 lg:grid lg:grid-cols-3 gap-6">
//         {diagnostics.length > 0 ? (
//           diagnostics.map((diagnostic) => (
//             <div key={diagnostic.id} className="bg-white shadow-lg rounded-lg p-6 space-y-4 gap-4">
//             <div className='flex ml-auto'>
//                 <img
//                   src={diagnostic.image_url}
//                   alt="Diagnostic Image"
//                   className="size-full object-cover rounded-lg"
//                 />
//               </div>
//             <div>
//               <h3 className="text-lg font-semibold mt-4">L'expert contacté pour le diagnostic : <span className='font-normal text-base'>{diagnostic.expert.user.first_name} {diagnostic.expert.user.last_name}</span></h3>
//               <p className='font-semibold text-lg mt-4'> Description : <span className='text-base font-normal'>{diagnostic.description}</span></p>
//               <p className="text-gray-400 text-md flex ml-auto mt-4"> Date de soumission : {new Date(diagnostic.created_at).toLocaleDateString()}</p>
//               </div>

//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">Vous n'avez pas encore soumis de diagnostics.</p>
//         )}
//       </div>
//     </div>
//   );
// }


// 'use client';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '@/context/AuthContext';
// import { ClipLoader } from 'react-spinners';

// interface Diagnostic {
//   id: number;
//   expert_id: string;
//   farmer_id: string;
//   description: string;
//   image: string;
//   status: string;
//   created_at: string;
//   image_url: string;
//   expert: {
//     id: number;
//     user_id: number;
//     speciality: string;
//     user: {
//       id: number;
//       last_name: string;
//       first_name: string;
//     };
//   };
// }

// export default function DiagnosticsList() {
//   const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const { user } = useAuth();

//   useEffect(() => {
//     const fetchDiagnostics = async () => {
//       const token = localStorage.getItem('auth_token');
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `http://localhost:8000/api/diagnostics/farmer/${user?.id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true,
//           }
//         );
//         setDiagnostics(response.data);
//       } catch (err) {
//         setError("Erreur lors de la récupération des diagnostics");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) {
//       fetchDiagnostics();
//     }
//   }, [user]);

//   return (
//     <div className="lg:max-w-7xl lg:mx-auto px-4 py-6">
//       <h1 className="text-2xl font-semibold text-center mb-6">Mes Diagnostics</h1>

//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {/* Indicateur de chargement */}
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="text-lg font-medium">
//              <ClipLoader size={20} color="#fff" />
//           </div>
//         </div>
//       ) : (
//         <div className="space-y-4 lg:grid lg:grid-cols-3 gap-6">
//           {diagnostics.length > 0 ? (
//             diagnostics.map((diagnostic) => (
//               <div
//                 key={diagnostic.id}
//                 className="bg-white shadow-lg rounded-lg p-6 space-y-4 transform hover:scale-105 transition-transform duration-300"
//               >
//                 <div className="flex justify-end">
//                   <img
//                     src={diagnostic.image_url}
//                     alt="Diagnostic"
//                     className="w-full h-48 object-cover rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold mt-4">
//                     L'expert contacté pour le diagnostic :{' '}
//                     <span className="font-normal text-base">
//                       {diagnostic.expert.user.first_name} {diagnostic.expert.user.last_name}
//                     </span>
//                   </h3>
//                   <p className="font-semibold text-lg mt-4">
//                     Description :{' '}
//                     <span className="text-base font-normal">{diagnostic.description}</span>
//                   </p>
//                   <p className="text-gray-400 text-md mt-4">
//                     Date de soumission : {new Date(diagnostic.created_at).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500">
//               Vous n'avez pas encore soumis de diagnostics.
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }



'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { ClipLoader } from 'react-spinners';

interface Diagnostic {
  id: number;
  expert_id: string;
  farmer_id: string;
  description: string;
  image: string;
  status: string;
  created_at: string;
  image_url: string;
  expert: {
    id: number;
    user_id: number;
    speciality: string;
    user: {
      id: number;
      last_name: string;
      first_name: string;
    };
  };
}

interface Comment {
  id: number;
  user_id: number;
  diagnostic_id: number;
  comment: string;
  created_at: string;
  user: {
    first_name: string;
    last_name: string;
  };
}

export default function DiagnosticsList() {
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDiagnostics = async () => {
      const token = localStorage.getItem('auth_token');
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/diagnostics/farmer/${user?.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }

        );
        console.log()
        setDiagnostics(response.data);
      } catch (err) {
        setError("Erreur lors de la récupération des diagnostics");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDiagnostics();
    }
  }, [user]);

  const fetchComments = async (diagnosticId: number) => {
    const token = localStorage.getItem('auth_token');
    try {
      const response = await axios.get(
        `http://localhost:8000/api/comments/diagnostic/${diagnosticId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setComments((prevComments) => ({
        ...prevComments,
        [diagnosticId]: response.data,
      }));
    } catch (err) {
      console.error(`Erreur lors de la récupération des commentaires pour le diagnostic ${diagnosticId}`);
    }
  };

  useEffect(() => {
    if (diagnostics.length > 0) {
      diagnostics.forEach((diagnostic) => {
        fetchComments(diagnostic.id);
      });
    }
  }, [diagnostics]);

  return (
    <div className="lg:max-w-7xl lg:mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold text-center mb-6">Mes Diagnostics</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader size={20} color="#000" />
        </div>
      ) : (
        <div className="space-y-4 lg:grid lg:grid-cols-3 gap-6">
          {diagnostics.length > 0 ? (
            diagnostics.map((diagnostic) => (
              <div
                key={diagnostic.id}
                className="bg-white shadow-lg rounded-lg p-6 space-y-4 transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-end">
                  <img
                    src={diagnostic.image_url}
                    alt="Diagnostic"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mt-4">
                    L'expert contacté :{' '}
                    <span className="font-normal text-base">
                    {diagnostic.expert.user.id}
                      {diagnostic.expert.user.first_name} {diagnostic.expert.user.last_name}
                    </span>
                  </h3>
                  <p className="font-semibold text-lg mt-4">
                    Description :{' '}
                    <span className="text-base font-normal">{diagnostic.description}</span>
                  </p>
                  <p className="text-gray-400 text-md mt-4">
                    Date de soumission : {new Date(diagnostic.created_at).toLocaleDateString()}
                  </p>

                  {/* Liste des commentaires */}
                  <div className="mt-4">
                    <h4 className="text-md font-semibold">Commentaires :</h4>
                    {comments[diagnostic.id]?.length > 0 ? (
                      <ul className="mt-2 space-y-2">
                        {comments[diagnostic.id].map((comment) => (
                          <li key={comment.id} className="bg-gray-100 p-3 rounded-lg">
                            {/* <p className="text-sm font-medium">
                              {comment.user.first_name} {comment.user.last_name}
                            </p> */}
                            <p className="text-sm text-gray-600">{comment.comment}</p>
                            <p className="text-xs text-gray-400">
                              {new Date(comment.created_at).toLocaleDateString()}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">Aucun commentaire</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Vous n'avez pas encore soumis de diagnostics.</p>
          )}
        </div>
      )}
    </div>
  );
}
