import React from 'react'
import Link from 'next/link'

const FarmComponent = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 flex items-center justify-center">Gestion des parcelles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-4">
        
        {/* Carte pour afficher la liste des parcelles */}
        <div className="rounded overflow-hidden shadow-lg bg-white p-6 cursor-pointer">
          <Link href="/dashboard/agriculteur/farm/list"> {/* Lien vers la page de la liste des parcelles */}
            <div className="text-center">
              <h2 className="text-xl font-medium mb-4">Voir les parcelles</h2>
              <p className="text-gray-600 mb-4">Accédez à la liste de vos parcelles existantes.</p>
              <button className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300">
                Voir la liste
              </button>
            </div>
          </Link>
        </div>

        {/* Carte pour créer une nouvelle parcelle */}
        <div className=" rounded overflow-hidden shadow-lg bg-white p-6 cursor-pointer ">
          <Link href="/dashboard/agriculteur/farm/create"> {/* Lien vers la page de création de parcelle */}
            <div className="text-center">
              <h2 className="text-xl font-medium mb-4">Créer une nouvelle parcelle</h2>
              <p className="text-gray-600 mb-4">Ajoutez une nouvelle parcelle à votre ferme.</p>
              <button className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300">
                Créer une parcelle
              </button>
            </div>
          </Link>
        </div>


      </div>
    </div>
  )
}

export default FarmComponent
