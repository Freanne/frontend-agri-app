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


// import Link from 'next/link';
// import { IoInformationCircleSharp } from "react-icons/io5";
// import Image from 'next/image';

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
//                   <Link href={`/diagnosis/${id}`}>
//                     <IoInformationCircleSharp size={40} className='text-green-500'/>
//                   </Link>
//             </div>
//             <div className='h-24 p-2'>
//               <div className='text-lg p-2'>
//                 <p>{name}</p>
//                 <hr className='border-2 border-slate-400'/>
//                 <p>{pathogene}</p>
//               </div>

//             </div>
//       </div>
//   );
// };

// export default CardDiagnosis;
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import Link from 'next/link';
import { IoInformationCircleSharp } from 'react-icons/io5';
import { Autoplay, Pagination } from 'swiper/modules';

interface CardDiagnosisProps {
  images: string[]; // Tableau d'images
  name: string;
  pathogene: string;
  id: number;
}

const CardDiagnosis: React.FC<CardDiagnosisProps> = ({ images, name, pathogene, id }) => {
  const validImages = Array.isArray(images) ? images : []
  return (
    <div className="rounded-lg bg-green-50 size-96 h-fit m-4">
      <Swiper 
        modules={[Autoplay, Pagination]} 
        spaceBetween={10} 
        slidesPerView={1} 
        autoplay={{
          delay: 1000, 
          disableOnInteraction: false, 
        }}
      >
        {validImages.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image as string}
              alt={`Image ${index + 1} de ${name}`}
              width={300}
              height={200}
             className="object-cover size-64 rounded-lg w-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
            <div className='flex items-end justify-end mr-2 mt-2'>
                  <Link href={`/diagnosis/${id}`}>
                   <IoInformationCircleSharp size={40} className='text-green-500'/>
                  </Link>
            </div>

            <div className='h-24 p-2'>
              <div className='text-lg p-2'>
                 <p>{name}</p>
                 <hr className='border-2 border-slate-400'/>
                 <p className='text-black'>{pathogene}</p>
               </div>

            </div>
    </div>
  );
};

export default CardDiagnosis;
