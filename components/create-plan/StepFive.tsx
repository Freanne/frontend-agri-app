"use client";

import { Controller, useFormContext } from "react-hook-form";
import { z } from "zod";

export const StepFiveSchema = z.object({
  startDate: z.string().nonempty("Veuillez entrer une date."),
  duration: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().min(1, "Veuillez entrer une durée.")),
  workforce: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().min(1, "Veuillez entrer le nombre de travailleurs.")),
  equipment: z.string().min(2, "Veuillez entrez un matériel disponible"),
});

interface StepFiveProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepFive({ onNext, onBack }: StepFiveProps) {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();


  const handleNextStep = async () => {
    // Validation manuelle pour l'étape 2
    const isValid = await trigger([
      "startDate",
      "duration",
      "workforce",
      "equipment"
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
      <h2 className="text-xl font-bold">Étape 5 : Planification du Travail</h2>

      {/* Date de début */}
      <div>
        <label className="block font-medium">Date de début :</label>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="date"
              className="w-full border rounded-lg p-2"
            />
          )}
        />
        {errors.startDate?.message && (
          <p className="text-red-500 text-sm">{String(errors.startDate.message)}</p>
        )}
      </div>

      {/* Durée estimée */}
      <div>
        <label className="block font-medium">Durée estimée :</label>
        <Controller
          name="duration"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              value={field.value ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value === "" ? "" : parseFloat(value));
              }}
              className="w-full border rounded-lg p-2"
              placeholder="Durée en jours ou mois"
            />
          )}
        />
        {errors.duration?.message && (
          <p className="text-red-500 text-sm">{String(errors.duration.message)}</p>
        )}
      </div>

      {/* Main-d'œuvre requise */}
      <div>
        <label className="block font-medium">Main-d'œuvre requise :</label>
        <Controller
          name="workforce"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              value={field.value ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value === "" ? "" : parseFloat(value));
              }}
              className="w-full border rounded-lg p-2"
              placeholder="Nombre de travailleurs"
            />
          )}
        />
        {errors.workforce?.message && (
          <p className="text-red-500 text-sm">{String(errors.workforce.message)}</p>
        )}
      </div>

      {/* Matériel disponible */}
      <div>
        <label className="block font-medium">Matériel disponible :</label>
        <Controller
          name="equipment"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="w-full border rounded-lg p-2"
              placeholder="Matériel disponible (optionnel)"
            />
          )}
        />
        {errors.equipment?.message && (
          <p className="text-red-500 text-sm">{String(errors.equipment.message)}</p>
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
