// import Image from 'next/image'
// import React from 'react'
// import ban from '@/public/images/ban_3.jpg'

// const PlanSection = () => {
//   return (
//     <div className='bg-green-100 p-12'>
//         <div className='m-12 flex gap-20'>
//             <div>
//                 <h1 className='text-4xl font-bold '>Créez votre plan de culture sur-mesure</h1>
//                 <p className='text-xl text-justify my-2'>Bénéficiez d&apos;un plan de culture personnalisé en fonction de vos conditions locales, de vos objectifs, et des recommandations des experts.</p>
//                 <button className='border border-green-600 p-4 rounded-lg my-5'>Créez votre plan ici</button>
//             </div>
//             <div>
//                 <div className='relative border-2 border-green-600 rounded-md p-36'>
                    
//                 <Image
//                     src={ban}
//                     alt=''
//                     width={500}
//                     height={500}
//                     className='absolute -inset-10 mt-20 rounded-md shadow-lg shadow-gray-300 size-72'
//                 />
//                 </div>
                
//             </div>
//         </div>
//     </div>
//   )
// }

// export default PlanSection

import Image from 'next/image';
import React from 'react';
import ban from '@/public/pot-mais.jpg'
import Link from 'next/link';

const PlanSection = () => {
  return (
    <div className='bg-green-100 p-6 sm:p-12'>
      <div className='mx-auto flex max-w-7xl flex-col lg:flex-row items-center gap-10 lg:gap-20'>
      <div className=''>   
          <Image
              src={ban}
              alt=''
              width={500}
              height={500}
              className='rounded-md shadow-lg shadow-gray-300'
          />
        </div>
               
        {/* Left Content */}
        <div className='lg:w-1/2'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold'>
            Créez votre plan de culture sur-mesure
          </h1>
          <p className='text-base sm:text-lg lg:text-xl text-justify my-2'>
            Bénéficiez d&apos;un plan de culture personnalisé en fonction de vos conditions locales, de vos objectifs, et des recommandations des experts.
          </p>
          <Link href='/signin'>
          <button className='border border-green-600 p-3 sm:p-4 rounded-lg my-5 hover:bg-green-500 hover:text-white hover:font-semibold hover:border-0'>
            Créez votre plan ici
          </button>
          </Link>
        </div>
    
      </div>
    </div>
  );
};

export default PlanSection;
