'use client'
import React, { useState } from 'react';

const DiagnosisForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  // Gère la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ici, tu pourrais envoyer l'image et la description à une API pour analyse
    if (image && description) {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('description', description);

      // Appelle une API pour diagnostiquer
    //   try {
    //     const response = await fetch('/api/diagnose', {
    //       method: 'POST',
    //       body: formData,
    //     });

    //     const result = await response.json();
    //     console.log(result);
    //     // Affiche le résultat du diagnostic ici
    //   } catch (error) {
    //     console.error('Erreur lors du diagnostic:', error);
    //   }
    }
  };

  // Gère l'upload de l'image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="lg:mx-auto lg:max-w-7xl mx-4 mt-20">
      <h2 className="text-2xl font-bold mb-4">Diagnostique des maladies des plantes de mais</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label htmlFor="imageUpload" className="block text-lg font-medium text-gray-700 mt-10">
            Télécharge une image de la plante affectée :
          </label>
          <input
            type="file"
            id="imap-4 bg-white geUpload"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-2 block w-full text-lg item-center"
          />
        </div>

        {/* Champ pour la description des symptômes */}
        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700 mt-10">
            Décris les symptômes observés :
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
            rows={4}
            placeholder="Décris les taches, les décolorations ou autres symptômes observés sur la plante"
          ></textarea>
        </div>


        <div>
          <button
            type="submit"
            className="flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 mt-10"
          >
            Soumettre pour analyse
          </button>
        </div>
      </form>

      {/* Section pour afficher les résultats après analyse */}
      {/* Ajouter la logique ici pour afficher les résultats */}
    </div>
  );
};

export default DiagnosisForm;
