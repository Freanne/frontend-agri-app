// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import ExpertsList from './ExpertList';
// import { HiOutlineMail } from 'react-icons/hi'; // Icône de mail
// import { useAuth } from '@/context/AuthContext';

// import UploadInterface from '@/components/diagnostic/Upload';
// import { AiOutlineCloudUpload } from 'react-icons/ai';   

// interface Expert {
//   id: number;
//   name: string;
//   speciality: string;
//   experience: string;
//   availability: string;
  
//   user: {
//     id: number;
//     first_name: string;
//     last_name: string;
//     email: string;
//     phone: string;
//   };
// }

// export default function Diagnostic() {
//   const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();
//   const { user } = useAuth();
//   const [formData, setFormData] = useState({
//     details: '', // Contient le message de l'agriculteur
//   });

//   const [filePreview, setFilePreview] = useState<string | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const previewURL = URL.createObjectURL(file);
//       setFilePreview(previewURL);
//     }
//   };

//   // Sélectionner un expert
//   const handleSelectExpert = (expert: Expert | null) => {
//     setSelectedExpert(expert);
//   };

//   useEffect(() => {
//     if (selectedExpert) {
//       const fetchMessages = async () => {
//         const token = localStorage.getItem('auth_token');
//         try {
//           const response = await axios.get(`http://localhost:8000/api/experts/${selectedExpert.user?.id}`, {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true,
//           });
//         } catch (error) {
//           setError('Erreur lors de la récupération des messages');
//         }
//       };
//       fetchMessages();
//     }
//   }, [selectedExpert]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = localStorage.getItem('auth_token');
//     try {
//       // Envoi des données du diagnostic, y compris l'image et la description
//       const formDataToSubmit = new FormData();
//       formDataToSubmit.append('expert_id', selectedExpert?.id.toString() || '');
//       formDataToSubmit.append('description', formData.details);
//       formDataToSubmit.append('farmer_id', user?.id?.toString() || '');

//       if (filePreview) {
//         // Ajoute le fichier d'image s'il est présent
//         const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
//         if (fileInput?.files?.[0]) {
//           formDataToSubmit.append('image', fileInput.files[0]);
//         }
//       }

//       const response = await axios.post('http://localhost:8000/api/diagnostics/create', formDataToSubmit, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });
//       console.log(response.data)
//       router.push('/dashboard/agriculteur/diagnostic/diagnosticlist');
//       // Traiter la réponse si nécessaire
//       // if (response.data.success) {
//       //   router.push('/dashboard/agriculteur/diagnostic/diagnosticlist'); // Rediriger vers une page de succès
//       // }
//     } catch (error) {
//       setError('Erreur lors de l\'envoi du message');
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6">
//       <h1 className="text-2xl font-semibold text-center mb-6">Faites vos diagnostics</h1>

//       <div className="grid grid-cols-3 gap-4">
//         {/* Liste des experts à gauche */}
//         <div className="col-span-1">
//           <ExpertsList onSelectExpert={handleSelectExpert} />
//         </div>

//         {/* Section de messagerie à droite */}
//         {selectedExpert && (
//           <div className='my-6 col-span-2'>
//             <p className='mb-2 flex items-center justify-center text-lg font-semibold'>
//               Diagnostic avec {selectedExpert.user.first_name} {selectedExpert.user.last_name}
//             </p>

//             <div className="mx-4 p-4 bg-white shadow-lg rounded-lg space-y-4">
//               {/* Formulaire de diagnostic */}
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center h-52 space-y-2 relative">
//                   <AiOutlineCloudUpload size={40} className="text-gray-500" />
//                   <p className="text-gray-700 font-semibold">Téléverser une image à diagnostiquer</p>
//                   <p className="text-gray-400 text-sm">(4 MB max)</p>

//                   {/* Hidden File Input */}
//                   <div className="absolute inset-0 w-full h-full flex items-center justify-center">
//                     <input 
//                       type="file" 
//                       accept="image/*"  // Limité aux images
//                       className="opacity-0 w-full h-full cursor-pointer" 
//                       onChange={handleFileChange}
//                     />
//                   </div>
//                 </div>

//                 {/* Aperçu du fichier uploadé */}
//                 {filePreview && (
//                   <div className="flex justify-center">
//                     <img src={filePreview} alt="Preview" className="max-w-full max-h-40 rounded-lg" />
//                   </div>
//                 )}

//                 {/* Description Section */}
//                 <div className="space-y-2">
//                   <label className="text-gray-700 font-semibold"> Description</label>
//                   <textarea
//                     value={formData.details}
//                     onChange={(e) => setFormData({ ...formData, details: e.target.value })}
//                     placeholder="Donnez-nous plus de symptômes..."
//                     className="w-full p-2 border border-gray-300 rounded-lg resize-none h-36"
//                   />
//                 </div>

//                 {/* Bouton de soumission */}
//                 <div className="flex justify-end">
//                   <button 
//                     type="submit"
//                     className="py-2 px-4 bg-green-600 text-white rounded-lg font-semibold"
//                   >
//                     Soumettre
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {!selectedExpert && <p className="text-center text-gray-500">Veuillez sélectionner un expert pour démarrer le diagnostic.</p>} 
//       </div>
//     </div>
//   );
// }


// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import ExpertsList from './ExpertList';
// import { HiOutlineMail } from 'react-icons/hi'; // Exemple d'icône de mail
// import { useAuth } from '@/context/AuthContext';
// import { AiOutlineCloudUpload } from 'react-icons/ai';

// interface Expert {
//   id: number;
//   name: string;
//   speciality: string;
//   experience: string;
//   availability: string;
//   user: {
//     id: number;
//     first_name: string;
//     last_name: string;
//     email: string;
//     phone: string;
//   };
// }

// export default function Diagnostic() {
//   const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();
//   const { user } = useAuth();
//   const [formData, setFormData] = useState({
//     details: '', // Contient le message de l'agriculteur
//   });
//   const [filePreview, setFilePreview] = useState<string | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const previewURL = URL.createObjectURL(file);
//       setFilePreview(previewURL);
//     }
//   };

//   // Sélectionner un expert
//   const handleSelectExpert = (expert: Expert | null) => {
//     setSelectedExpert(expert);
//   };

//   useEffect(() => {
//     if (selectedExpert) {
//       const fetchMessages = async () => {
//         const token = localStorage.getItem('auth_token');
//         try {
//           await axios.get(
//             `http://localhost:8000/api/experts/${selectedExpert.user?.id}`,
//             {
//               headers: { Authorization: `Bearer ${token}` },
//               withCredentials: true,
//             }
//           );
//           // Vous pouvez traiter la réponse si besoin (ex: mettre à jour l'état des messages)
//         } catch (error) {
//           setError('Erreur lors de la récupération des messages');
//         }
//       };
//       fetchMessages();
//     }
//   }, [selectedExpert]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = localStorage.getItem('auth_token');
//     try {
//       // Création d'un FormData pour envoyer l'image et la description
//       const formDataToSubmit = new FormData();
//       formDataToSubmit.append('expert_id', selectedExpert?.id.toString() || '');
//       formDataToSubmit.append('description', formData.details);
//       formDataToSubmit.append('farmer_id', user?.id?.toString() || '');

//       if (filePreview) {
//         const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
//         if (fileInput?.files?.[0]) {
//           formDataToSubmit.append('image', fileInput.files[0]);
//         }
//       }

//       const response = await axios.post('http://localhost:8000/api/diagnostics/create', formDataToSubmit, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });
//       console.log(response.data);
//       router.push('/dashboard/agriculteur/diagnostic/diagnosticlist');
//     } catch (error) {
//       setError("Erreur lors de l'envoi du message");
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6">
//       <h1 className="text-2xl font-bold text-center mb-6">Faites vos diagnostics</h1>

//       {/* Message d'erreur */}
//       {/* {error && <p className="text-red-500 text-center mb-4">{error}</p>} */}

//       {/* Grille responsive : en mobile, la liste des experts et le formulaire s'affichent en colonne */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Liste des experts */}
//         <div className="lg:col-span-1">
//           <ExpertsList onSelectExpert={handleSelectExpert} />
//         </div>

//         {/* Section diagnostic */}
//         <div className="lg:col-span-2">
//           {selectedExpert ? (
//             <div className="space-y-6">
//               <p className="text-center text-lg font-semibold">
//                 Diagnostic avec {selectedExpert.user.first_name} {selectedExpert.user.last_name}
//               </p>

//               <div className="bg-white shadow-lg rounded-lg p-6 space-y-6 transition duration-300">
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   {/* Zone de téléchargement d'image */}
//                   <div className="relative border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center h-52 transition-all duration-300 hover:border-green-500 hover:bg-green-50">
//                     <AiOutlineCloudUpload size={40} className="text-gray-500" />
//                     <p className="text-gray-700 font-semibold">Téléverser une image à diagnostiquer</p>
//                     <p className="text-gray-400 text-sm">(4 MB max)</p>
//                     <input 
//                       type="file" 
//                       accept="image/*"  // Limité aux images
//                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                       onChange={handleFileChange}
//                     />
//                   </div>

//                   {/* Aperçu de l'image uploadée */}
//                   {filePreview && (
//                     <div className="flex justify-center">
//                       <img src={filePreview} alt="Aperçu" className="max-w-full max-h-40 rounded-lg shadow-md" />
//                     </div>
//                   )}

//                   {/* Zone de description */}
//                   <div className="space-y-2">
//                     <label className="block text-gray-700 font-semibold">Description</label>
//                     <textarea
//                       value={formData.details}
//                       onChange={(e) => setFormData({ ...formData, details: e.target.value })}
//                       placeholder="Donnez-nous plus de symptômes..."
//                       className="w-full p-3 border border-gray-300 rounded-lg resize-none h-36 focus:outline-none focus:border-green-500 transition"
//                     />
//                   </div>

//                   {/* Bouton de soumission */}
//                   <div className="flex justify-end">
//                     <button 
//                       type="submit"
//                       className="py-2 px-6 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
//                     >
//                       Soumettre
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-center text-gray-500">
//                 Veuillez sélectionner un expert pour démarrer le diagnostic.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ExpertsList from './ExpertList';
import { HiOutlineMail } from 'react-icons/hi'; // Exemple d'icône de mail
import { useAuth } from '@/context/AuthContext';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import ClipLoader from 'react-spinners/ClipLoader';

interface Expert {
  id: number;
  user_id: number;
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

export default function Diagnostic() {
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    details: '', // Contient le message de l'agriculteur
  });
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewURL = URL.createObjectURL(file);
      setFilePreview(previewURL);
    }
  };

  // Sélectionner un expert
  const handleSelectExpert = (expert: Expert | null) => {
    setSelectedExpert(expert);
  };

  useEffect(() => {
    if (selectedExpert) {
      const fetchMessages = async () => {
        const token = localStorage.getItem('auth_token');
        try {
          const response =  await axios.get(
            `http://localhost:8000/api/experts/${selectedExpert.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );
          console.log(response.data)
          // Vous pouvez traiter la réponse si besoin (ex: mettre à jour l'état des messages)
        } catch (error) {
          setError('Erreur lors de la récupération des messages');
        }
      };
      fetchMessages();
    }
  }, [selectedExpert]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');

    // Vérification des champs obligatoires
    if (!formData.details || !filePreview) {
      setError("Veuillez fournir une description et uploader une image.");
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem('auth_token');

    try {
      // Création d'un FormData pour envoyer l'image et la description
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('expert_id', selectedExpert?.id.toString() || '');
      formDataToSubmit.append('description', formData.details);
      formDataToSubmit.append('farmer_id', user?.id?.toString() || '');

      // Récupération du fichier depuis l'input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput?.files?.[0]) {
        formDataToSubmit.append('image', fileInput.files[0]);
      }

      const response = await axios.post(
        'http://localhost:8000/api/diagnostics/create',
        formDataToSubmit,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log(response.data);

      // Affichage du message de succès
      setSuccessMessage("Votre diagnostic a été soumis avec succès!");

      // Optionnel : réinitialiser le formulaire
      setFormData({ details: '' });
      setFilePreview(null);

      // Redirection après 2 secondes
      setTimeout(() => {
        router.push('/dashboard/agriculteur/diagnostic/diagnosticlist');
      }, 2000);
    } catch (error) {
      setError("Erreur lors de l'envoi du message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">Faites vos diagnostics</h1>

      {/* Affichage du message d'erreur */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Affichage du message de succès */}
      {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

      {/* Grille responsive : en mobile, la liste des experts et le formulaire s'affichent en colonne */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des experts */}
        <div className="lg:col-span-1">
          <ExpertsList onSelectExpert={handleSelectExpert} />
        </div>

        {/* Section diagnostic */}
        <div className="lg:col-span-2">
          {selectedExpert ? (
            <div className="space-y-6">
              <p className="text-center text-lg font-semibold">
                Diagnostic avec {selectedExpert.user.first_name} {selectedExpert.user.last_name}
              </p>

              <div className="bg-white shadow-lg rounded-lg p-6 space-y-6 transition duration-300">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Zone de téléchargement d'image */}
                  <div className="relative border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center h-52 transition-all duration-300 hover:border-green-500 hover:bg-green-50">
                    <AiOutlineCloudUpload size={40} className="text-gray-500" />
                    <p className="text-gray-700 font-semibold">Téléverser une image à diagnostiquer</p>
                    <p className="text-gray-400 text-sm">(4 MB max)</p>
                    <input 
                      type="file" 
                      accept="image/*"  // Limité aux images
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                  </div>

                  {/* Aperçu de l'image uploadée */}
                  {filePreview && (
                    <div className="flex justify-center">
                      <img src={filePreview} alt="Aperçu" className="max-w-full max-h-40 rounded-lg shadow-md" />
                    </div>
                  )}

                  {/* Zone de description */}
                  <div className="space-y-2">
                    <label className="block text-gray-700 font-semibold">Description</label>
                    <textarea
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Donnez-nous plus de symptômes..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none h-36 focus:outline-none focus:border-green-500 transition"
                    />
                  </div>

                  {/* Bouton de soumission avec spinner */}
                  <div className="flex justify-end">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 py-2 px-6 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
                    >
                      {isSubmitting ? <ClipLoader size={20} color="#fff" /> : "Soumettre"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-center text-gray-500">
                Veuillez sélectionner un expert pour démarrer le diagnostic.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
