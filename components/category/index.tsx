// import React from 'react';
// import Link from 'next/link';
// import { TbCapture } from 'react-icons/tb';
// import { FaLongArrowAltRight } from 'react-icons/fa';
// import { CiMedicalClipboard } from 'react-icons/ci';
// import { IoReaderOutline } from 'react-icons/io5';

// const DiagnosticSection: React.FC = () => {
//   return (
//     <div className="bg-white py-12 px-6 mx-auto flex max-w-7xl ">
//       <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between text-left">

//         <div className="lg:w-1/2 lg:pr-12 mt-12">
//           <h2 className="text-2xl sm:text-2xl lg:text-4xl font-bold text-gray-800">
//             Diagnostic de vos cultures
//           </h2>
//           <p className="mt-4 text-gray-600 text-lg sm:text-xl lg:text-2xl">
//             Identifiez rapidement les maladies et problèmes de vos plantes grâce à notre outil de diagnostic.
//           </p>
          
//           {/* Bouton vers la page de diagnostic */}
//           <Link href="/diagnostic" passHref>
//             <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg text-lg transition mt-6">
//               Diagnostiquez vos cultures
//             </button>
//           </Link>
//         </div>



//         <div className='my-6'>
//         <h1 className='text-black text-xl font-semibold'>Faites diagnostiquer vos cultures !</h1>
//         <div className='border bg-green-600 p-4 my-2 rounded-2xl shadow-xl'>
//           <p className='text-xl font-semibold m-2 text-white'>Soignez vos cultures</p>
//           <div className='md:flex md:items-center md:justify-center gap-4 md:m-2'>
//             <div className='border border-gray-400 bg-white p-3 md:p-4 text-center rounded-xl'>
//               <div className='bg-green-300 rounded-full size-8 md:size-12 max-w-lg mx-auto md:max-w-2xl md:mx-auto flex items-center justify-center'>
//                 <TbCapture className='text-lg md:text-2xl'/>
//               </div>
//               <p className='text-base'>Prendre une photo</p>
//             </div>

//             <FaLongArrowAltRight className='shrink-0 rotate-90 max-w-xl mx-auto my-2 text-xl md:text-4xl text-black lg:rotate-0 md:rotate-0'/>

//             <div className='border border-gray-400 bg-white p-3 md:p-4 text-center rounded-xl'>
//               <div className='bg-green-300 rounded-full size-8 md:size-12 max-w-lg mx-auto md:max-w-2xl md:mx-auto flex items-center justify-center'>
//                 <IoReaderOutline className='text-lg md:text-2xl'/>
//               </div>
//               <p className='text-base'>Lisez le diagnostic</p>
//             </div>

//             <FaLongArrowAltRight className='shrink-0 rotate-90 max-w-xl mx-auto my-2 text-xl md:text-4xl text-black lg:rotate-0 md:rotate-0'/>

//             <div className='border border-gray-400 bg-white p-3 md:p-4 text-center rounded-xl'>
//               <div className='bg-green-300 rounded-full size-8 md:size-12 max-w-lg mx-auto md:max-w-2xl md:mx-auto flex items-center justify-center'>
//                 <CiMedicalClipboard className='text-lg md:text-2xl'/>
//               </div>
//               <p className='text-base'>Obtenez le traitement</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default DiagnosticSection;

import React from "react";
import Link from "next/link";
import { TbCapture } from "react-icons/tb";
import { FaLongArrowAltRight } from "react-icons/fa";
import { CiMedicalClipboard } from "react-icons/ci";
import { IoReaderOutline } from "react-icons/io5";

const DiagnosticSection: React.FC = () => {
  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start text-left space-y-12 lg:space-y-0 lg:space-x-16">
        {/* Texte de la section */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
            Diagnostic de vos cultures
          </h2>
          <p className="mt-4 text-gray-600 text-lg lg:text-xl">
            Identifiez rapidement les maladies et problèmes de vos plantes grâce à notre outil de diagnostic.
          </p>
          <Link href="/diagnostic" passHref>
            <button className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg text-lg transition">
              Diagnostiquez vos cultures
            </button>
          </Link>
        </div>

        {/* Carte de diagnostic */}
        <div className="lg:w-1/2 w-full">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Faites diagnostiquer vos cultures !
          </h3>
          <div className="bg-green-600 text-white p-6 rounded-2xl shadow-xl">
            <p className="text-lg font-semibold mb-4">
              Soignez vos cultures en 3 étapes simples :
            </p>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Étape 1 : Prendre une photo */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-white p-4 rounded-full shadow-lg mb-2">
                  <TbCapture className="text-green-600 text-3xl" />
                </div>
                <p className="text-base">Prendre une photo</p>
              </div>

              {/* Flèche */}
              <FaLongArrowAltRight className="hidden md:block text-3xl text-white" />

              {/* Étape 2 : Lire le diagnostic */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-white p-4 rounded-full shadow-lg mb-2">
                  <IoReaderOutline className="text-green-600 text-3xl" />
                </div>
                <p className="text-base">Lire le diagnostic</p>
              </div>

              {/* Flèche */}
              <FaLongArrowAltRight className="hidden md:block text-3xl text-white" />

              {/* Étape 3 : Obtenir un traitement */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-white p-4 rounded-full shadow-lg mb-2">
                  <CiMedicalClipboard className="text-green-600 text-3xl" />
                </div>
                <p className="text-base">Obtenez le traitement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagnosticSection;

