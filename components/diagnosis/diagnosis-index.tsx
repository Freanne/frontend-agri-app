import Image from 'next/image'
import { diagnosis } from '@/constants/diagnosis';
import React from 'react'
import { notFound } from 'next/navigation';

const DetailsDiseases = ({ params }: { params: { id: string } }) => {
    const disease = diagnosis.find(d => d.id === Number(params.id));
  
    if (!disease) {
      notFound(); // Afficher une page Not Found si l'ID n'est pas valide
    }
  return (
    <div>
    <div className="lg:max-w-7xl lg:mx-auto p-5">
      <h1 className="text-3xl font-bold">{disease?.name}</h1>
      <div className="mt-5">
        <Image 
          src={disease?.imageUrl} 
          alt={disease?.name} 
          width={500} 
          height={500} 
          className="rounded-lg" 
        />
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-semibold">Pathogène: {disease?.pathogene}</h2>
        <p className="mt-3">{disease?.description}</p>
        <h3 className="mt-5 text-xl font-semibold">Prévention</h3>
        <p>{disease?.prevention}</p>
      </div>
    </div>
    </div>
  )
}

export default DetailsDiseases