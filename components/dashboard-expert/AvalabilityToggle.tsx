'use client'
import { useState } from 'react';

export default function AvailabilityToggle() {
  const [available, setAvailable] = useState(true);

  return (
    <div className="flex items-center space-x-4">
      <span className="text-lg">Disponibilité :</span>
      <button
        onClick={() => setAvailable(!available)}
        className={`px-4 py-2 rounded-md text-white ${available ? 'bg-green-500' : 'bg-red-500'}`}
      >
        {available ? 'Disponible' : 'Non disponible'}
      </button>
    </div>
  );
}
