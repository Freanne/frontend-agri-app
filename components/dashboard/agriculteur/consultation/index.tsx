import React from 'react'
import Link from 'next/link'

const ConsultationComponent = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 flex items-center justify-center">Gestion des parcelles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-4">
        
        {/* Carte pour afficher la liste des parcelles */}
        <div className="rounded overflow-hidden shadow-lg bg-white p-6 cursor-pointer">
          <Link href="/dashboard/agriculteur/consultations/list"> {/* Lien vers la page de la liste des parcelles */}
            <div className="text-center">
              <h2 className="text-xl font-medium mb-4">Voir les consultations demandées</h2>
              <p className="text-gray-600 mb-4">Accédez à la liste de vos demandes de consultation.</p>
              <button className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300">
                Voir la liste des consultations demandées
              </button>
            </div>
          </Link>
        </div>

        {/* Carte pour créer une nouvelle parcelle */}
        <div className=" rounded overflow-hidden shadow-lg bg-white p-6 cursor-pointer ">
          <Link href="/dashboard/agriculteur/consultations/create"> {/* Lien vers la page de création de parcelle */}
            <div className="text-center">
              <h2 className="text-xl font-medium mb-4">Faire une demande de consultation</h2>
              <p className="text-gray-600 mb-4">Faites une demande de consultation à l'expert de votre choix</p>
              <button className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300">
                Faire une demande de consultation
              </button>
            </div>
          </Link>
        </div>


      </div>
    </div>
  )
}

export default ConsultationComponent