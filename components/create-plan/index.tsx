// components/TimelineForm.js
'use client'
import { useState } from 'react';
import InfoForm from './InfoForm';
import ConditionsForm from './ConditionsForm';
import DetailsForm from './DetailsForm';

const steps = [
  { id: 1, label: 'Préparation du sol' },
  { id: 2, label: 'Semis' },
  { id: 3, label: 'Arrosage' },
  { id: 4, label: 'Récolte' },
  { id: 5, label: 'Récolte' },
  { id: 6, label: 'Soumettre' },
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

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
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
    <div className="flex flex-col items-center bg-green-50">
      {/* Timeline */}
      <div className="flex w-full max-w-7xl my-12 mx-5">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex items-center">
            <button
              onClick={() => setCurrentStep(index)}
              className={`size-6 rounded-full items-center ${
                index <= currentStep ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              {step.id}
            </button>
            {/* <p className="mt-2 text-xs text-center flex items-center">{step.label}</p> */}
            {index < steps.length - 1 && (
              <div
                className={`h-1 w-[230px] ${
                  index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Formulaire de l'étape actuelle */}
      <div className="w-full mx-5 md:max-w-4xl bg-white p-4 shadow-md rounded mt-16 mb-64">
        {currentStep < steps.length - 1 ? (
          <>
            {currentStep === 0 && (
              <div>
                <label className='text-lg font-medium'>Information sur la ferme :</label>

                <InfoForm/>
              </div>
            )}
            {currentStep === 1 && (
              <div>
                <label className='text-lg font-medium'>Conditions Environnementales :</label>

                <ConditionsForm/>
              </div>
            )}
            {currentStep === 2 && (
              <div>
                <label className='text-lg font-medium'>Détails sur la culture du mais :</label>
                {/* <input
                  type="text"
                  name="arrosage"
                  value={formData.arrosage}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                /> */}
                <DetailsForm/>
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
    <div className='flex justify-between'>
          <div className='flex items-start'>
            {currentStep > 0 && (
                <button
                  onClick={handlePrevious}
                  className="mt-4 px-4 py-2 text-md font-medium bg-green-800 text-white rounded hover:bg-green-600"
                >
                  Précédent
                </button>
              )}
          </div>
          <div className='flex '>
          <button
            onClick={handleNext}
            className="mt-4 px-4 py-2 text-md font-medium bg-green-500 text-white rounded hover:bg-green-600"
          >
            {currentStep < steps.length - 1 ? 'Suivant' : 'Soumettre'}
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
