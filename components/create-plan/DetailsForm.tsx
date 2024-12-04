import React from 'react'

const DetailsForm = () => {
  return (
    <div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            Nom de la parcelle
        </label>
        <input
          type="text"
          id=""
          className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder=""
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Superficie de la ferme
        </label>
        <input
          type="text"
          id="lastName"
          className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder=""
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Localisation
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder=""
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Type de sol
        </label>
        <input
          type="tel"
          id="phone"
          className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder=""
        />
      </div>
      </div>
    </div>
  )
}

export default DetailsForm