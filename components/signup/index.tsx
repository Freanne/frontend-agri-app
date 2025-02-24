// 'use client';
// import React, { useState } from 'react';
// import FormFarmer from './FormFarmer';
// import FormExpert from './FormExpert';

// const Inscription = () => {
//   const [activeForm, setActiveForm] = useState<string>('formOne');

//   const showFormOne = () => setActiveForm('formOne');
//   const showFormTwo = () => setActiveForm('formTwo');

//   return (
//     <div className="my-10 md:max-w-6xl md:mx-auto bg-white p-6 bg-gre shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold text-center text-green-700 mb-6">S&apos;inscrire</h2>

//       {/* <div className="flex justify-center mb-8">
//         <button 
//           onClick={showFormOne} 
//           className={`px-6 py-3 font-semibold transition duration-300 ease-in-out ${
//             activeForm === 'formOne'
//               ? 'bg-green-600 text-white rounded-l-lg'
//               : 'bg-gray-200 text-green-600 hover:bg-green-100'
//           }`}
//         >
//           En tant qu&apos;agriculteur
//         </button>
//         <button 
//           onClick={showFormTwo} 
//           className={`px-6 py-3 font-semibold transition duration-300 ease-in-out ${
//             activeForm === 'formTwo'
//               ? 'bg-green-600 text-white rounded-r-lg'
//               : 'bg-gray-200 text-green-600 hover:bg-green-100'
//           }`}
//         >
//           En tant qu&apos;expert agricole
//         </button>
//       </div> */}

//       <div className="p-6 bg-green-50 border border-gray-200 rounded-lg">
//         {/* {activeForm === 'formOne' && <FormFarmer />}
        
//         {activeForm === 'formTwo' && <FormExpert />} */}
//         {/* <FormFarmer /> */}
//          <FormExpert /> 
//       </div>
//     </div>
//   );
// };

// export default Inscription;


'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import FormFarmer from './FormFarmer';
import FormExpert from './FormExpert';

const Inscription = () => {
  const [activeForm, setActiveForm] = useState<string>('formOne');

  const showFormOne = () => setActiveForm('formOne');
  const showFormTwo = () => setActiveForm('formTwo');

  return (
    <div className="my-10 md:max-w-6xl md:mx-auto bg-white p-6 bg-gre shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">S&apos;inscrire</h2>

      <div className="flex justify-center mb-8">
        <button 
          onClick={showFormOne} 
          className={`px-6 py-3 font-semibold transition duration-300 ease-in-out ${
            activeForm === 'formOne'
              ? 'bg-green-600 text-white rounded-l-lg'
              : 'bg-gray-200 text-green-600 hover:bg-green-100'
          }`}
        >
          En tant qu&apos;agriculteur
        </button>
        <button 
          onClick={showFormTwo} 
          className={`px-6 py-3 font-semibold transition duration-300 ease-in-out ${
            activeForm === 'formTwo'
              ? 'bg-green-600 text-white rounded-r-lg'
              : 'bg-gray-200 text-green-600 hover:bg-green-100'
          }`}
        >
          En tant qu&apos;expert agricole
        </button>
      </div>

      <div className="p-6 bg-green-50 border border-gray-200 rounded-lg">
        <motion.div
          key={activeForm}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
        >
          {activeForm === 'formOne' && <FormFarmer />}
          {activeForm === 'formTwo' && <FormExpert />}
        </motion.div>
      </div>
    </div>
  );
};

export default Inscription;

