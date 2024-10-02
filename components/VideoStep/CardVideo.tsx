import NextVideo from "next-video";
import { Player } from 'video-react';

const StepByStepVideos = () => {
  return (
    <div className="flex justify-center items-center bg-gray-100">
        <video
            controls 
            className="bg-black rounded-lg border-2 border-gray-300 size-96 mr-auto"
          >
        <source src='/semis.mp4' type="video/mp4" />

        Your browser does not support the video tag.
      </video>
  </div>
  )
};

export default StepByStepVideos;
