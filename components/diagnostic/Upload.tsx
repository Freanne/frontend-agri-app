'use client'
import React from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BsCalendar } from 'react-icons/bs';

const UploadInterface: React.FC = () => {
  return (
    <div className="mx-5 md:max-w-7xl md:mx-auto p-4 bg-white shadow-lg rounded-lg space-y-4">
      {/* Upload Section */}
      <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center h-52 space-y-2 relative">
        <AiOutlineCloudUpload size={40} className="text-gray-500" />
        <p className="text-gray-700 font-semibold">Upload an image or video</p>
        <p className="text-gray-400 text-sm">or, click to browse (4 MB max)</p>
        
        {/* Hidden File Input within a wrapper */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <input 
            type="file" 
            accept="image/*,video/*" 
            className="opacity-0 w-full h-full cursor-pointer" 
            onChange={(e) => {
              if (e.target.files) {
                const file = e.target.files[0];
                console.log("File selected:", file);
              }
            }}
          />
        </div>
      </div>

      {/* Tags Section */}
      <div className="space-y-2">
        <label className="text-gray-700 font-semibold"> Description</label>
        <textarea
          placeholder="Donnez-nous plus de symptômes..."
          className="w-full p-2 border border-gray-300 rounded-lg resize-none h-36"
        ></textarea>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center">
        <button className="py-2 px-4 bg-green-600 text-white rounded-lg font-semibold">
          Soumettre
        </button>
      </div>
    </div>
  );
};

export default UploadInterface;
