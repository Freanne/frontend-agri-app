"use client";

import { Controller, useFormContext } from "react-hook-form";


interface StepSevenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepSeven({ onNext, onBack }: StepSevenProps) {
  const {
    control,
    formState: { errors },
    trigger
  } = useFormContext();


  return (
    <div className="lg:mx-auto lg:max-w-5xl p-4 border bg-white rounded-lg shadow-md space-y-4">
      
      {/* Boutons */}
      <div className="grid grid-cols-2 gap-x-36">
        <button onClick={onBack} className="px-4 py-2 bg-green-300 rounded">
          Retour
        </button>
        <button onClick={handleNextStep} className="px-4 py-2 bg-green-500 text-white rounded">
          Soumettre
        </button>
      </div>
    </div>
  );
}
