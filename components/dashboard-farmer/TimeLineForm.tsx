// components/TimelineForm.js
'use client'
import { useState } from 'react';

const steps = [
  { id: 1, label: 'Préparation du sol' },
  { id: 2, label: 'Semis' },
  { id: 3, label: 'Arrosage' },
  { id: 4, label: 'Récolte' },
  { id: 5, label: 'Soumettre' },
];

export default function TimelineForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    sol: '',
    semis: '',
    arrosage: '',
    recolte: ''
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Données du formulaire:', formData);
    // Envoyer les données ici avec une requête API ou un autre traitement
  };

  return (
    <div className="flex flex-col items-center">
      {/* Timeline */}
      <div className="flex justify-between w-full max-w-4xl mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex items-center">
            <button
              onClick={() => setCurrentStep(index)}
              className={`size-4 rounded-full ${
                index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
            {/* <p className="mt-2 text-xs text-center flex items-center">{step.label}</p> */}
            {index < steps.length - 1 && (
              <div
                className={`h-1 w-24 ${
                  index < currentStep ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Formulaire de l'étape actuelle */}
      <div className="w-full max-w-lg bg-white p-6 shadow-md rounded">
        {currentStep < steps.length - 1 ? (
          <>
            {currentStep === 0 && (
              <div>
                <label>Préparation du sol :</label>
                <input
                  type="text"
                  name="sol"
                  value={formData.sol}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
            )}
            {currentStep === 1 && (
              <div>
                <label>Semis :</label>
                <input
                  type="text"
                  name="semis"
                  value={formData.semis}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
            )}
            {currentStep === 2 && (
              <div>
                <label>Arrosage :</label>
                <input
                  type="text"
                  name="arrosage"
                  value={formData.arrosage}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
            )}
            {currentStep === 3 && (
              <div>
                <label>Récolte :</label>
                <input
                  type="text"
                  name="recolte"
                  value={formData.recolte}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <p>Prêt à soumettre toutes les étapes ?</p>
          </div>
        )}

        <button
          onClick={handleNext}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {currentStep < steps.length - 1 ? 'Suivant' : 'Soumettre'}
        </button>
      </div>
    </div>
  );
}
