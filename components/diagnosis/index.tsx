// 'use client'
// import React, { useState } from 'react';
// import CardDiagnosis from './CardDiagnosis';
// import { diagnosis } from '@/constants/diagnosis';
// import { BiSearch } from 'react-icons/bi';
// import { BsVirus } from 'react-icons/bs';


// const Diagnosis = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [pathogenFilter, setPathogenFilter] = useState('');

//   const uniquePathogens = [
//     ...new Set(diagnosis.map(disease => disease.pathogene))
//   ];

//   const filterData = () => {
//     return diagnosis.filter(disease =>
//       disease.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (pathogenFilter === '' || disease.pathogene.includes(pathogenFilter))
//     );
//   };

//   return (
//     <div>
//       {/* <div className='lg:max-w-7xl lg:mx-auto mx-10 text-2xl font-semibold mt-12'>Les plantes de mais sont exposés à plusieurs maladies et ravageurs. Y a quelques principales maladies ici, il faut en prendre connaissance.</div> */}
//       <div className='lg:max-w-7xl lg:mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-24 py-5 mx-5'>
//         <div className='relative m-5 flex h-fit max-h-fit'>
//           <input 
//             type="text"
//             placeholder='Recherche'
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className='rounded-md h-12 w-full bg-green-100 px-8' 
//           />
//           <BiSearch className='absolute inset-y-0 left-2 top-1/2 -translate-y-1/2'/>
//         </div>
//         <div className='relative m-5 flex h-fit max-h-fit'>
//           <select
//             value={pathogenFilter}
//             onChange={(e) => setPathogenFilter(e.target.value)}
//             className='rounded-md h-12 w-full bg-green-100 px-8'
//           >
//             <option value=''>Filtrer par pathogène</option>
//             {uniquePathogens.map((pathogen, index) => (
//               <option key={index} value={pathogen}>
//                 {pathogen}
//               </option>
//             ))}
//           </select>
//             <BsVirus className='absolute inset-y-0 left-2 top-1/2 -translate-y-1/2'/>
//         </div>
//       </div>

//       <div className='border flex items-center justify-center py-8'>
//         <div className='grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-y-5'>
//           {filterData().map(disease => (
//             <CardDiagnosis
//               key={disease.id}
//               image={disease.imageUrl}
//               name={disease.name}
//               pathogene={disease.pathogene}
//               id={disease.id}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Diagnosis;


'use client';
import React, { useState, useEffect } from 'react';
import api from '@/services/api'; // Chemin vers ton fichier axiosConfig.js
import CardDiagnosis from './CardDiagnosis';
import { BiSearch } from 'react-icons/bi';
import { BsVirus } from 'react-icons/bs';
import LoadingAgriculture from '../common/loading';

const Diagnosis = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pathogenFilter, setPathogenFilter] = useState('');
  const [diagnoses, setDiagnoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Appeler l'API pour récupérer les diagnostics
    const fetchDiagnoses = async () => {
      try {
        const response = await api.get('/diagnosis');
        setDiagnoses(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des données.');
        setLoading(false);
      }
    };

    fetchDiagnoses();
  }, []);

  const uniquePathogens = [
    ...new Set(diagnoses.map((disease: any) => disease.pathogene)),
  ];

  const filterData = () => {
    return diagnoses.filter(
      (disease: any) =>
        disease.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (pathogenFilter === '' || disease.pathogene.includes(pathogenFilter))
    );
  };

  if (loading) {
    return <LoadingAgriculture/>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="lg:max-w-7xl lg:mx-auto px-5">
      {/* Recherche et filtre */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-5">
        {/* Champ de recherche */}
        <div className="relative">
          <input
            type="text"
            placeholder="Recherche"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-md h-12 w-full bg-green-100 px-10 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Filtre par pathogène */}
        <div className="relative">
          <select
            value={pathogenFilter}
            onChange={(e) => setPathogenFilter(e.target.value)}
            className="rounded-md h-12 w-full bg-green-100 px-10 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Filtrer par pathogène</option>
            {uniquePathogens.map((pathogen, index) => (
              <option key={index} value={pathogen}>
                {pathogen}
              </option>
            ))}
          </select>
          <BsVirus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Liste des cartes ou message d'absence de résultat */}
      <div className='py-8'>
        {filterData().length > 0 ? (
          <div className='grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-y-5'>
            {filterData().map((disease: any) => (
              <CardDiagnosis
                key={disease.id}
                images={disease.image_url}
                //{disease.image_url}
                name={disease.name}
                pathogene={disease.pathogene}
                id={disease.id}
              />
            ))}
          </div>
       
        ) : (
          <div className="text-center text-gray-500 text-lg">
            Aucun résultat trouvé pour votre recherche.
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Diagnosis;


