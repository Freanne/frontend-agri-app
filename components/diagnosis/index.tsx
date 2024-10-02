'use client'
import React, { useState } from 'react';
import CardDiagnosis from './CardDiagnosis';
import { diagnosis } from '@/constants/diagnosis';
import { FaLongArrowAltRight } from "react-icons/fa";
import { TbCapture } from "react-icons/tb";
import { IoReaderOutline } from "react-icons/io5";
import { CiMedicalClipboard } from "react-icons/ci";
import { BiSearch } from 'react-icons/bi';
import { BsVirus } from 'react-icons/bs';

const Diagnosis = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pathogenFilter, setPathogenFilter] = useState('');

  // Extraire les pathogènes uniques
  const uniquePathogens = [
    ...new Set(diagnosis.map(disease => disease.pathogene))
  ];


  // Fonction pour filtrer les données
  const filterData = () => {
    return diagnosis.filter(disease =>
      disease.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (pathogenFilter === '' || disease.pathogene.includes(pathogenFilter))
    );
  };

  return (
    <div>
      <div className='border max-w-7xl mx-auto my-5'>
        <h1 className='text-black text-xl font-semibold py-4 text-center'>Faites diagnostiquer vos cultures !</h1>
        <div className='border bg-green-600 mx-5 p-4 my-2 rounded-2xl shadow-xl'>
          <p className='text-xl font-semibold m-2 text-white'>Soignez vos cultures</p>
          <div className='md:flex md:items-center md:justify-center gap-4 md:m-2'>
            <div className='border border-gray-400 bg-white p-3 md:p-4 text-center rounded-xl'>
              <div className='bg-green-300 rounded-full size-8 md:size-12 max-w-lg mx-auto md:max-w-2xl md:mx-auto flex items-center justify-center'>
                <TbCapture className='text-lg md:text-2xl'/>
              </div>
              <p className='text-base'>Prendre une photo</p>
            </div>

            <FaLongArrowAltRight className='shrink-0 rotate-90 max-w-xl mx-auto my-2 text-xl md:text-4xl text-black lg:rotate-0 md:rotate-0'/>

            <div className='border border-gray-400 bg-white p-3 md:p-4 text-center rounded-xl'>
              <div className='bg-green-300 rounded-full size-8 md:size-12 max-w-lg mx-auto md:max-w-2xl md:mx-auto flex items-center justify-center'>
                <IoReaderOutline className='text-lg md:text-2xl'/>
              </div>
              <p className='text-base'>Lisez le diagnostic</p>
            </div>

            <FaLongArrowAltRight className='shrink-0 rotate-90 max-w-xl mx-auto my-2 text-xl md:text-4xl text-black lg:rotate-0 md:rotate-0'/>

            <div className='border border-gray-400 bg-white p-3 md:p-4 text-center rounded-xl'>
              <div className='bg-green-300 rounded-full size-8 md:size-12 max-w-lg mx-auto md:max-w-2xl md:mx-auto flex items-center justify-center'>
                <CiMedicalClipboard className='text-lg md:text-2xl'/>
              </div>
              <p className='text-base'>Obtenez le traitement</p>
            </div>
          </div>
          
        </div>
      </div>

      <div className='lg:max-w-7xl lg:mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-24 py-5 mx-5'>
        <div className='relative m-5 flex h-fit max-h-fit'>
          <input 
            type="text"
            placeholder='Recherche'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='rounded-md h-12 w-full bg-green-100 px-8' 
          />
          <BiSearch className='absolute inset-y-0 left-2 top-1/2 -translate-y-1/2'/>
        </div>
        <div className='relative m-5 flex h-fit max-h-fit'>
          <select
            value={pathogenFilter}
            onChange={(e) => setPathogenFilter(e.target.value)}
            className='rounded-md h-12 w-full bg-green-100 px-8'
          >
            <option value=''>Filtrer par pathogène</option>
            {uniquePathogens.map((pathogen, index) => (
              <option key={index} value={pathogen}>
                {pathogen}
              </option>
            ))}
          </select>
            <BsVirus className='absolute inset-y-0 left-2 top-1/2 -translate-y-1/2'/>
        </div>
      </div>

      <div className='border flex items-center justify-center py-8'>
        <div className='grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-y-5'>
          {filterData().map(disease => (
            <CardDiagnosis
              key={disease.id}
              image={disease.imageUrl}
              name={disease.name}
              pathogene={disease.pathogene}
              id={disease.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Diagnosis;
