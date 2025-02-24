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
//     farmer : {
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
//         const response = await axios.get(`http://localhost:8000/api/diagnostics/expert/${user?.id}`, {
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
//               <h3 className="text-lg font-semibold mt-4">Le diagnostic de : <span className='font-normal text-base'>{diagnostic.farmer.user.first_name} {diagnostic.farmer.user.last_name}</span></h3>
//               <p className='font-semibold text-lg mt-4'> Description : <span className='text-base font-normal'>{diagnostic.description}</span></p>
//               <p className="text-gray-400 text-md flex ml-auto mt-4"> Date de soumission : {new Date(diagnostic.created_at).toLocaleDateString()}</p>
//               </div>

//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">Vous n'avez pas encore reçus de diagnostics.</p>
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
//   farmer: {
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
//         const response = await axios.get(`http://localhost:8000/api/diagnostics/expert/${user?.id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         });
//         setDiagnostics(response.data);
//       } catch (error) {
//         setError("Erreur lors de la récupération des diagnostics.");
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

//       {/* Message d'erreur */}
//       {error && <p className="text-red-500 text-center bg-red-100 p-3 rounded-lg">{error}</p>}

//       {/* Loader */}
//       {loading && (
//         <div className="flex justify-center items-center py-10">
//           <ClipLoader size={50} color="#4F46E5" />
//         </div>
//       )}

//       {/* Liste des diagnostics */}
//       {!loading && diagnostics.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {diagnostics.map((diagnostic) => (
//             <div key={diagnostic.id} className="bg-white shadow-lg rounded-lg overflow-hidden p-4 space-y-4">
//               {/* Image */}
//               <div className="h-48 w-full">
//                 <img
//                   src={diagnostic.image_url}
//                   alt="Diagnostic Image"
//                   className="w-full h-full object-cover rounded-md"
//                 />
//               </div>

//               {/* Informations */}
//               <div className="space-y-2">
//                 <h3 className="text-lg font-semibold">
//                   Diagnostic de :{" "}
//                   <span className="font-normal text-gray-700">
//                     {diagnostic.farmer.user.first_name} {diagnostic.farmer.user.last_name}
//                   </span>
//                 </h3>
//                 <p className="text-gray-600">
//                   <span className="font-semibold">Description :</span> {diagnostic.description}
//                 </p>
//                 <p className="text-gray-400 text-sm">
//                   <span className="font-semibold">Date :</span>{" "}
//                   {new Date(diagnostic.created_at).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         !loading && <p className="text-center text-gray-500">Vous n'avez pas encore reçu de diagnostics.</p>
//       )}
//     </div>
//   );
// }


'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { ClipLoader } from 'react-spinners';

interface Comment {
  id: number;
  diagnostic_id: number;
  user_id: number;
  comment: string;
  created_at: string;
}

interface Diagnostic {
  id: number;
  expert_id: string;
  farmer_id: string;
  description: string;
  image: string;
  status: string;
  created_at: string;
  image_url: string;
  farmer: {
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

export default function DiagnosticsList() {
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDiagnostics = async () => {
      const token = localStorage.getItem('auth_token');
      try {
        const response = await axios.get(`http://localhost:8000/api/diagnostics/expert/${user?.id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setDiagnostics(response.data);
        console.log(response.data)
      } catch (error) {
        setError("Erreur lors de la récupération des diagnostics.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDiagnostics();
    }
  }, [user]);

  return (
    <div className="lg:max-w-7xl lg:mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold text-center mb-6">Mes Diagnostics</h1>

      {/* Message d'erreur */}
      {error && <p className="text-red-500 text-center bg-red-100 p-3 rounded-lg">{error}</p>}

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <ClipLoader size={50} color="#4F46E5" />
        </div>
      )}

      {/* Liste des diagnostics */}
      {!loading && diagnostics.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {diagnostics.map((diagnostic) => (
            <DiagnosticCard key={diagnostic.id} diagnostic={diagnostic} />
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-gray-500">Vous n'avez pas encore reçu de diagnostics.</p>
      )}
    </div>
  );
}

function DiagnosticCard({ diagnostic }: { diagnostic: Diagnostic }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [loadingComments, setLoadingComments] = useState<boolean>(true);
  const [addingComment, setAddingComment] = useState<boolean>(false);

  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem('auth_token');
      try {
        const response = await axios.get(`http://localhost:8000/api/comments/diagnostic/${diagnostic.id}`,
          { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
        );
        setComments(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des commentaires");
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [diagnostic.id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setAddingComment(true);
    const token = localStorage.getItem('auth_token');

    try {
      const response = await axios.post(
        'http://localhost:8000/api/comments/add',
        { diagnostic_id: diagnostic.id, expert_id: user?.id, comment: newComment },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      console.log('comment', response.data)
      // Ajouter le commentaire à la liste sans recharger la page
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire");
    } finally {
      setAddingComment(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 space-y-4">
      {/* Image */}
      <div className="h-48 w-full">
        <img src={diagnostic.image_url} alt="Diagnostic Image" className="w-full h-full object-cover rounded-md" />
      </div>

      {/* Informations */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">
          Diagnostic de :{" "}
          <span className="font-normal text-gray-700">
          {diagnostic.farmer.user.id}
            {diagnostic.farmer.user.first_name} {diagnostic.farmer.user.last_name}
          </span>
        </h3>
        <p className="text-gray-600">
          <span className="font-semibold">Description :</span> {diagnostic.description}
        </p>
        <p className="text-gray-400 text-sm">
          <span className="font-semibold">Date :</span> {new Date(diagnostic.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Commentaires */}
      <div className="mt-4">
        <h4 className="font-semibold text-gray-800 mb-2">Commentaires :</h4>
        {loadingComments ? (
          <ClipLoader size={25} color="#4F46E5" />
        ) : comments.length > 0 ? (
          <div className="space-y-2">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-100 p-2 rounded-lg">
                <p className="text-sm">{comment.comment}</p>
                <p className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Aucun commentaire pour ce diagnostic.</p>
        )}

        {/* Ajouter un commentaire */}
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Ajouter un commentaire..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600"
            onClick={handleAddComment}
            disabled={addingComment}
          >
            {addingComment ? "Envoi..." : "Envoyer"}
          </button>
        </div>
      </div>
    </div>
  );
}
