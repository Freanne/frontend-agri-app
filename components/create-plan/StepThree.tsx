"use client";

import { Controller, useFormContext } from "react-hook-form";
import { z } from "zod";

const StepThreeSchema = z.object({
  seedVariety: z.enum(["hybride", "local", "gm"], {
    required_error: "Veuillez sélectionner une variété de semence.",
  }),
  seedQuantity: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().min(1, "Veuillez entrer une quantité valide.")
  ),
  spacing: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().min(1, "Veuillez entrer une valeur valide.")
  ),
  irrigationType: z.enum(["goutte", "aspersion", "manuelle", "naturelle"], {
    required_error: "Veuillez sélectionner un type d'irrigation.",
  }),
  irrigationFrequency: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().min(1, "Veuillez entrer une fréquence.")
  ),

});

interface StepThreeProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepThree({ onNext, onBack }: StepThreeProps) {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();

  const handleNextStep = async () => {
    // Validation manuelle pour l'étape 2
    const isValid = await trigger([
      "seedVariety",
      "seedQuantity",
      "spacing",
      "irrigationType",
      "irrigationFrequency",
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
      <h2 className="text-xl font-bold">Étape 3 : Semences et Irrigation</h2>

      {/* Variété de semences */}
      <div>
        <label className="block font-medium">Variété de semence :</label>
        <Controller
          name="seedVariety"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full border rounded-lg p-2">
              <option value="">-- Sélectionnez --</option>
              <option value="hybride">Hybride</option>
              <option value="local">Local</option>
              <option value="gm">Génétiquement Modifié</option>
            </select>
          )}
        />
        {errors.seedVariety?.message && (
          <p className="text-red-500 text-sm">{String(errors.seedVariety.message)}</p>
        )}
      </div>

      {/* Quantité de semence */}
      <div>
        <label className="block font-medium">Quantité de semences (kg) :</label>
        <Controller
          name="seedQuantity"
          control={control}
          render={({ field }) => (
            <input
              type="number"
              {...field}
              value={field.value ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value === "" ? "" : parseFloat(value));
              }}
              className="w-full border rounded-lg p-2"
              placeholder="Entrez la quantité"
            />
          )}
        />
        {errors.seedQuantity?.message && (
          <p className="text-red-500 text-sm">{String(errors.seedQuantity.message)}</p>
        )}
      </div>

      {/* Espacement entre semis */}
      <div>
        <label className="block font-medium">Espacement entre semis (cm) :</label>
        <Controller
          name="spacing"
          control={control}
          render={({ field }) => (
            <input
              type="number"
              {...field}
              value={field.value ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value === "" ? "" : parseFloat(value));
              }}
              className="w-full border rounded-lg p-2"
              placeholder="Entrez l'espacement"
            />
          )}
        />
        {errors.spacing?.message && (
          <p className="text-red-500 text-sm">{String(errors.spacing.message)}</p>
        )}
      </div>

      {/* Type d'irrigation */}
      <div>
        <label className="block font-medium">Type d’irrigation :</label>
        <Controller
          name="irrigationType"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full border rounded-lg p-2">
              <option value="">-- Sélectionnez --</option>
              <option value="goutte">Goutte</option>
              <option value="aspersion">Aspersion</option>
              <option value="manuelle">Manuelle</option>
              <option value="naturelle">Naturelle</option>
            </select>
          )}
        />
        {errors.irrigationType?.message && (
          <p className="text-red-500 text-sm">{String(errors.irrigationType.message)}</p>
        )}
      </div>

      {/* Fréquence d'irrigation */}
      <div>
        <label className="block font-medium">Fréquence d’irrigation (par semaine) :</label>
        <Controller
          name="irrigationFrequency"
          control={control}
          render={({ field }) => (
            <input
              type="number"
              {...field}
              value={field.value ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value === "" ? "" : parseFloat(value));
              }}
              className="w-full border rounded-lg p-2"
              placeholder="Entrez la fréquence"
            />
          )}
        />
        {errors.irrigationFrequency?.message&& (
          <p className="text-red-500 text-sm">{String(errors.irrigationFrequency.message)}</p>
        )}
      </div>

      {/* Boutons de navigation */}
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
