"use client";

import { Controller, useFormContext } from "react-hook-form";
import { z } from "zod";
export const StepSevenSchema = z.object({
  harvestDate: z.string().nonempty("Veuillez entrer une date."),
  harvestMethod: z.enum(["manuelle", "mécanisée"],
    {
      required_error: "Veuillez sélectionner une méthode de récolte.",
    }
  ),
  storageLocation: z.enum(["grenier", "entrepôt"],
    {
      required_error: "Veuillez sélectionner un lieu de stockage.",
    }
  ),
  yieldEstimation: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().min(0, "Veuillez entrer une estimation valide."))
});

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

  const handleNextStep = async () => {
    // Validation manuelle pour l'étape 2
    const isValid = await trigger([
      "harvestDate",
      "harvestMethod",
      "storageLocation",
      "yieldEstimation"
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
      <h2 className="text-xl font-bold">Étape 7 : Récolte et Post-Récolte</h2>

      {/* Date estimée de récolte */}
      <div>
        <label className="block font-medium">Date estimée de récolte :</label>
        <Controller
          name="harvestDate"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="date"
              className="w-full border rounded-lg p-2"
            />
          )}
        />
        {errors.harvestDate?.message && (
          <p className="text-red-500 text-sm">{String(errors.harvestDate.message)}</p>
        )}
      </div>

      {/* Méthode de récolte */}
      <div>
        <label className="block font-medium">Méthode de récolte :</label>
        <Controller
          name="harvestMethod"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full border rounded-lg p-2">
              <option value="">-- Sélectionnez --</option>
              <option value="manuelle">Manuelle</option>
              <option value="mécanisée">Mécanisée</option>
            </select>
          )}
        />
        {errors.harvestMethod?.message && (
          <p className="text-red-500 text-sm">{String(errors.harvestMethod.message)}</p>
        )}
      </div>

      {/* Lieu de stockage */}
      <div>
        <label className="block font-medium">Lieu de stockage :</label>
        <Controller
          name="storageLocation"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full border rounded-lg p-2">
              <option value="">-- Sélectionnez --</option>
              <option value="grenier">Grenier</option>
              <option value="entrepôt">Entrepôt</option>
            </select>
          )}
        />
        {errors.storageLocation?.message && (
          <p className="text-red-500 text-sm">{String(errors.storageLocation.message)}</p>
        )}
      </div>

      {/* Prévision de rendement */}
      <div>
        <label className="block font-medium">Prévision de rendement :</label>
        <Controller
          name="yieldEstimation"
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
              placeholder="Prévision de rendement en tonnes/ha"
            />
          )}
        />
        {errors.yieldEstimation?.message && (
          <p className="text-red-500 text-sm">{String(errors.yieldEstimation.message)}</p>
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
