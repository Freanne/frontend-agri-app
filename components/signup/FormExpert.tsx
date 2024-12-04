import React from 'react'

const FormExpert = () => {
  return (
    <div>
      <form>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mx-8 mt-8'>
            <input
              type="text"
              id=""
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nom"
            />
            <input 
              type="text"
              placeholder="Prénom"
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input 
              type="email"
              placeholder='Email'
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input 
              type="phone"
              placeholder='Téléphone'
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input 
              type="password"
              placeholder='Mot de passe'
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input 
              type="password"
              placeholder='Confirmer le mot de passe'
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input 
              type="number"
              placeholder='IFU'
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
        
            <input 
              type="text" 
              placeholder="Entrez votre spécialité" 
               className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input 
              type="text" 
              placeholder="Entrez votre expérience" 
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input 
              type="text" 
              placeholder="Entrez votre disponibilité" 
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

            <div className="flex justify-center items-center mt-8">
            <button className="text-lg rounded w-full mx-8 font-semibold px-16 py-2 bg-green-600 text-white hover:bg-green-700">
                S&apos;inscrire
            </button>
            </div>
        </form>
    </div>
  )
}

export default FormExpert