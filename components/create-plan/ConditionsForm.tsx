import React from 'react'

const ConditionsForm = () => {
  return (
    <div className='grid grid-cols-2 gap-4 my-4'>
        <div>
        <label htmlFor="gender" className="block text-base font-medium text-gray-700">
          Type de saisons
        </label>
        <select
          id="saisons"
          className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          
          <option value="pluvieuse">Pluvieuse</option>
          <option value="Seche">Sèche</option>
        </select>
      </div>

      <div>
        <label htmlFor="gender" className="block text-base font-medium text-gray-700">
          Disponibilité d&apos;eau
        </label>
        <select
          id="eau"
          className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >

          <option value="irrigation">Irrigation</option>
          <option value="pluie">Pluie uniquement</option>

        </select>
      </div>
    </div>
  )
}

export default ConditionsForm