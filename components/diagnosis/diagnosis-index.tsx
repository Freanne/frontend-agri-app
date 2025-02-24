// import Image from 'next/image'
// import { diagnosis } from '@/constants/diagnosis';
// import React from 'react'
// import { notFound } from 'next/navigation';

// const DetailsDiseases = ({ params }: { params: { id: string } }) => {
//     const disease = diagnosis.find(d => d.id === Number(params.id));
  
//     if (!disease) {
//       notFound(); // Afficher une page Not Found si l'ID n'est pas valide
//     }
//   return (
//     <div>
//     <div className="lg:max-w-7xl lg:mx-auto p-5">
//       <h1 className="text-3xl font-bold">{disease?.name}</h1>
//       <div className="mt-5">
//         <Image 
//           src={disease?.imageUrl} 
//           alt={disease?.name} 
//           width={500} 
//           height={500} 
//           className="rounded-lg" 
//         />
//       </div>
//       <div className="mt-5">
//         <h2 className="text-xl font-semibold">Pathogène: {disease?.pathogene}</h2>
//         <p className="mt-3">{disease?.description}</p>
//         <h3 className="mt-5 text-xl font-semibold">Prévention</h3>
//         <p>{disease?.prevention}</p>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default DetailsDiseases

// 'use client'
// import { notFound } from 'next/navigation';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import api from '@/services/api';

// interface Disease {
//   id: number;
//   name: string;
//   imageUrl: string[];
//   pathogene: string;
//   description: string;
//   prevention: string;
// }

// const DiagnosisDetail = ({ id }: { id: string }) => {
//   const [disease, setDisease] = useState<Disease | null>({
//     id: 0,
//     name: '',
//     imageUrl: [],
//     pathogene: '',
//     description: '',
//     prevention: '',
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Charger les données depuis l'API
//     const fetchDisease = async () => {
//       try {
//         const response = await api.get(`/diagnosis/${id}`);
//         setDisease(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError('Erreur lors du chargement des données.');
//         setLoading(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDisease();
//   }, [id]);



//   if (loading) {
//     return <p className="text-center">Chargement...</p>;
//   }

//   if (!disease) {
//     notFound(); // Redirige vers une page 404
//     return null; // Empêche de rendre quoi que ce soit si `notFound` n'est pas supporté
//   }
//   const validImages = Array.isArray(disease?.imageUrl) ? disease.imageUrl : [];

//   return (
//     <div className="lg:max-w-7xl lg:mx-auto p-5">
//     <div className="mt-5 bg-green-50 p-20 ml-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//       { validImages.length > 0 ? (
//         validImages.map((image, index)  => (
//           <Image
//             key={index}
//             src={image}
//             alt={`${disease.name} - ${index + 1}`}
//             width={500}
//             height={500}
//             className="rounded-lg w-full"
//           />
//         ))
//       ) : (
//         <p>Aucune image disponible</p>
//       )}
//     </div>
//       <div className="mt-5">
//         <h2 className="text-xl font-semibold">Pathogène : {disease.pathogene}</h2>
//         <p className="mt-3">{disease.description}</p>
//         <h3 className="mt-5 text-xl font-semibold">Prévention</h3>
//         <p>{disease.prevention}</p>
//       </div>
//     </div>
//   );
// };

// export default DiagnosisDetail;

'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from '@/services/api';
import LoadingAgriculture from '../common/loading';

interface Disease {
  id: number;
  name: string;
  image_url: string[];
  pathogene: string;
  description: string;
  prevention: string;
}

const DiagnosisDetail = ({ id }: { id: string }) => {
  const [disease, setDisease] = useState<Disease | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDisease = async () => {
      try {
        const response = await api.get(`/diagnosis/${id}`);
        console.log('Response data:', response.data); // Vérifiez les données ici
        setDisease(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        setError('Erreur lors du chargement des données.');
      } finally {
        setLoading(false);
      }
    };

    fetchDisease();
  }, [id]);

  if (loading) {
    return <LoadingAgriculture/>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!disease) {
    notFound();
    return null;
  }

  const validImages = Array.isArray(disease.image_url) ? disease.image_url : [];

  return (
    <div className="lg:max-w-7xl lg:mx-auto p-5">
      <p className='text-2xl font-bold'>{disease.name}</p>
      <div className="mt-5 bg-green-50 p-20 ml-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {validImages.length > 0 ? (
          validImages.map((image, index) => (
            <Image
              key={index}
              src={image as string}
              alt={`${disease.name} - ${index + 1}`}
              width={500}
              height={500}
              className="object-cover size-64 rounded-lg w-full"
              
            />
          ))
        ) : (
          <p>Aucune image disponible</p>
        )}
      </div>
      <div className="mt-5">
        <h2 className="text-xl">Le pathogène responsable est le : <span className='font-semibold text-green-600'>{disease.pathogene}</span></h2>
        <div className='grid grid-cols-1 my-5 lg:grid-cols-2 lg:my-10'>
          <div className='lg:border-r-4 mr-12 pr-12 mb-5'>
            <p className="text-xl font-semibold mb-5">Description de la maladie : </p>
            <p>{disease.description}</p>
          </div>
          
          <div className='mr-12'>
            <h3 className="text-xl font-semibold mb-5">Prévention</h3>
            <p>{disease.prevention}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisDetail;
