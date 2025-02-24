"use client";

import { Controller, useFormContext } from "react-hook-form";
import { z } from "zod";
export const StepSixSchema = z.object({
  diseaseHistory: z.enum(["aucune", "rouille", "charbon", "cercosporiose"], {
    required_error: "Veuillez sélectionner les antécédents de maladies.",
  }),
  pestControl: z.enum(["biologique", "chimique", "précautions"],
    {
      required_error: "Veuillez sélectionner les méthodes de prévention",
    }
  ),
});

interface StepSixProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepSix({ onNext, onBack }: StepSixProps) {
  const {
    control,
    formState: { errors },
    trigger
  } = useFormContext();

  const handleNextStep = async () => {
    // Validation manuelle pour l'étape 2
    const isValid = await trigger([
      "diseaseHistory",
      "pestControl"
    ]);
    
    if (isValid) {
      // Si les champs sont valides, on passe à l'étape suivante
      onNext();
    } else {
      // Si les champs ne sont pas valides, les erreurs s'affichent automatiquement
      console.log("Veuillez corriger les erreurs.");
    }
  };

  return (
    <div className="lg:mx-auto lg:max-w-5xl p-4 border bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-bold">Étape 6 : Suivi des Maladies et Ravageurs</h2>

      {/* Antécédents de maladies */}
      <div>
        <label className="block font-medium">Antécédents de maladies :</label>
        <Controller
          name="diseaseHistory"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full border rounded-lg p-2">
              <option value="">-- Sélectionnez --</option>
              <option value="aucune">Aucune</option>
              <option value="rouille">Rouille</option>
              <option value="charbon">Charbon</option>
              <option value="cercosporiose">Cercosporiose</option>
            </select>
          )}
        />
        {errors.diseaseHistory?.message && (
          <p className="text-red-500 text-sm">{String(errors.diseaseHistory.message)}</p>
        )}
      </div>

      {/* Méthodes de lutte contre les ravageurs */}
      <div>
        <label className="block font-medium">Méthodes de lutte :</label>
        <Controller
          name="pestControl"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full border rounded-lg p-2">
              <option value="">-- Sélectionnez --</option>
              <option value="biologique">Biologique</option>
              <option value="chimique">Chimique</option>
              <option value="précautions">Précautions</option>
            </select>
          )}
        />
        {errors.pestControl?.message && (
          <p className="text-red-500 text-sm">{String(errors.pestControl.message)}</p>
        )}
      </div>

      {/* Boutons */}
      <div className="grid grid-cols-2 gap-x-36">
        <button onClick={onBack} className="px-4 py-2 bg-green-300 rounded">
          Retour
        </button>
        <button onClick={handleNextStep} className="px-4 py-2 bg-green-500 text-white rounded">
          Suivant
        </button>
      </div>
    </div>
  );
}
