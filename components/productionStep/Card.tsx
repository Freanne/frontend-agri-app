import React from 'react';

interface VideoCardProps {
  videoSrc: string;
  title: string;
  description: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoSrc, title, description }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative pb-56">
        <video
          src={videoSrc}
          controls
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="">{description}</p>
      </div>
    </div>
  );
};

export default VideoCard;
