'use client';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import VideoCard from './Card';
import { Autoplay, Pagination, Scrollbar } from 'swiper/modules';
import './swiper.css'
import Image from 'next/image';
import { FaPlay } from "react-icons/fa";
const VideoCardList: React.FC = () => {
  const videos = [
    {
      videoSrc: '/Ep1.mp4',
      title: "Choix de variété",
      description: "Comment faire le choix de la varitété de mais et quel est le système d'irrigation adapté?",
    },
    {
      videoSrc: '/semis.mp4',
      title: 'La semence du mais',
      description: 'Comment et quand semer le mais ?',
    },
    {
      videoSrc: '/videos/video3.mp4',
      title: 'Vidéo 3',
      description: 'Ceci est la description de la vidéo 3[oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo[',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl my-12">
      {/* Afficher le Swiper uniquement sur les écrans mobiles */}
      <div className="block md:hidden mt-20 mx-4">
        <Swiper
          modules={[Autoplay, Pagination, Scrollbar]}
          spaceBetween={50}
          slidesPerView={1}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          className='custom-swiper'
        >
          {videos.map((video, index) => (
            <SwiperSlide key={index}>
              <VideoCard
                videoSrc={video.videoSrc}
                title={video.title}
                description={video.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Autres contenus que tu veux afficher sur les écrans plus larges */}
      <div className="hidden md:block ">
          <div className='mx-4'>
            <h1 className='text-3xl font-semibold'>Les différentes étapes de production du mais</h1>
            <p className='text-lg mt-2'>Nous vous présentons des vidéos qui vous montre les étappes à suivre dans la procution du mais en étant novice ou non. Cela est à titre informatif pour vous montrer la démarche à suivre</p>
          </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mx-4 '>
            {videos.map((video, index) => (

                <VideoCard 
                    key={index}
                    videoSrc={video.videoSrc}
                    title={video.title}
                    description={video.description}
                />

            ))}
        </div>
        <button className='bg-green-500 py-3 px-6 rounded-lg mt-4 ml-auto mr-6 text-white font-semibold text-lg flex items-center justify-center'>Voir plus</button>
      </div>
    </div>
  );
};

export default VideoCardList;


// export const HelpIndoorPlants = () => {
//   return (
//     <section className="bg-white py-16">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between space-x-12">
//         {/* Texte de la section */}
//         <div className="flex-1">
//           <h2 className="text-4xl font-semibold text-gray-900 mb-4">
//           Les différentes étapes de production du mais : Guides et conseils.
//           </h2>
//           <p className="text-lg text-gray-600 mb-6">
//           Nous vous présentons des vidéos qui vous montre les étappes à suivre dans la procution du mais en étant novice ou non. Cela est à titre informatif pour vous montrer la démarche à suivre.
//           </p>
//           <div className="space-x-4">
//             <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300">
//               En savoir plus
//             </button>
//             <button className="bg-transparent border-2 border-green-500 text-green-500 px-6 py-3 rounded-lg hover:bg-green-500 hover:text-white transition duration-300">
//               Regardez la vidéo
//             </button>
//           </div>
//         </div>


//         <div className="flex-shrink-0 relative w-96 h-96 rounded-full overflow-hidden">
//           <video
//           src='/Ep1.mp4'
//           controls
//           className="absolute top-0 left-0 w-full h-full object-cover"
//         />
//           {/* Icône de lecture */}
//           <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
//             <button className="text-white text-3xl">
//             <FaPlay /> 
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

export const HelpIndoorPlants = () => {
  // Référence pour la vidéo
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fonction pour lire la vidéo
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 lg:space-x-12">
        {/* Texte de la section */}
        <div className="flex-1">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
            Les différentes étapes de production du maïs : Guides et conseils.
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Nous vous présentons des vidéos qui vous montrent les étapes à suivre
            dans la production du maïs en étant novice ou non. Cela est à titre
            informatif pour vous montrer la démarche à suivre.
          </p>
          <div className="space-x-4 flex">
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300">
              En savoir plus
            </button>
            <button className="bg-transparent border-2 border-green-500 text-green-500 px-6 py-3 rounded-lg hover:bg-green-500 hover:text-white transition duration-300">
              Regardez la vidéo
            </button>
          </div>
        </div>

        {/* Vidéo */}
        <div className="flex-shrink-0 relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden">
          <video
            ref={videoRef} // Référence de la vidéo
            src="/Ep1.mp4"
            controls
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          {/* Icône de lecture */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 cursor-pointer"
            onClick={handlePlay} // Lecture de la vidéo
          >
            <FaPlay className="text-white text-4xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

// export default HelpIndoorPlants;
