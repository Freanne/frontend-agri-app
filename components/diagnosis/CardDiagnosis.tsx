// import Image from 'next/image'
// import React from 'react'

// import Link from 'next/link'
// import { IoInformationCircleSharp } from "react-icons/io5";


// const CardDiagnosis = ({image,name, pathogene,id } : {image:string | undefined, name:string, pathogene:string, id:number},) => {
  
//   return (
//       <div className='rounded-lg bg-green-50 size-96 h-fit mx-5'>
//             <div className="">
//                     <Image
//                     src={image as string}
//                     alt={name}
//                     className="object-cover size-64 rounded-lg w-full"
//                     width={500}
//                     height={500}
//                     />
//             </div>
//             <div className='flex items-end justify-end mr-2 mt-2'>
//                   <Link href="/"><IoInformationCircleSharp size={40} className='text-green-500'/></Link>
//                 </div>
//             <div className='h-24 p-2'>
//               <div className='text-lg p-2'>
//                 <p>{name}</p>
//                 <hr className='border-2 border-slate-400'/>
//                 <p>{pathogene}</p>
//               </div>

//             </div>
//       </div>


//   )
// }

// export default CardDiagnosis


import Link from 'next/link';
import { IoInformationCircleSharp } from "react-icons/io5";
import Image from 'next/image';

const CardDiagnosis = ({image,name, pathogene,id } : {image:string | undefined, name:string, pathogene:string, id:number},) => {
  
  return (
      <div className='rounded-lg bg-green-50 size-96 h-fit mx-5'>
            <div className="">
                    <Image
                    src={image as string}
                    alt={name}
                    className="object-cover size-64 rounded-lg w-full"
                    width={500}
                    height={500}
                    />
            </div>
            <div className='flex items-end justify-end mr-2 mt-2'>
                  <Link href={`/diagnosis/${id}`}>
                    <IoInformationCircleSharp size={40} className='text-green-500'/>
                  </Link>
            </div>
            <div className='h-24 p-2'>
              <div className='text-lg p-2'>
                <p>{name}</p>
                <hr className='border-2 border-slate-400'/>
                <p>{pathogene}</p>
              </div>

            </div>
      </div>
  );
};

export default CardDiagnosis;
