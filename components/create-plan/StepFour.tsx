"use client";

import { Controller, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const StepFourSchema = z.object({
  fertilizerType: z.enum(["organique", "chimique"], {
    required_error: "Veuillez sélectionner un type d'engrais.",
  }),
  fertilizerQuantity: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
  z.number().min(1, "Veuillez entrer une quantité d'engrais valide.")),
  fertilizerApplication: z.enum(["pré-plantation", "croissance", "floraison"], {
    required_error: "Veuillez sélectionner un moment d'application.",
  }),
  pesticides: z.string().min(3,"veuillez entrer "),
});


interface StepFourProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepFour({ onNext, onBack }: StepFourProps) {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();

  const handleNextStep = async () => {
    // Validation manuelle pour l'étape 2
    const isValid = await trigger([
      "fertilizerType",
      "fertilizerQuantity",
      "fertilizerApplication",
      "pesticides",
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
      <h2 className="text-xl font-bold">Étape 4 : Gestion des Intrants</h2>
      
      {/* Type d'engrais */}
      <div>
        <label className="block font-medium">Type d'engrais :</label>
        <Controller
          name="fertilizerType"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full border rounded-lg p-2">
              <option value="">-- Sélectionnez --</option>
              <option value="organique">Organique</option>
              <option value="chimique">Chimique</option>
            </select>
          )}
        />
        {errors.fertilizerType?.message && (
          <p className="text-red-500 text-sm">{String(errors.fertilizerType.message)}</p>
        )}
      </div>
      
      {/* Quantité d'engrais */}
      <div>
        <label className="block font-medium">Quantité (kg) :</label>
        <Controller
          name="fertilizerQuantity"
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
              placeholder="Entrez la quantité en kg"
            />
          )}
        />
        {errors.fertilizerQuantity?.message && (
          <p className="text-red-500 text-sm">{String(errors.fertilizerQuantity.message)}</p>
        )}
      </div>

      {/* Moment d'application */}
      <div>
        <label className="block font-medium">Moment d’application :</label>
        <Controller
          name="fertilizerApplication"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full border rounded-lg p-2">
              <option value="">-- Sélectionnez --</option>
              <option value="pré-plantation">Pré-plantation</option>
              <option value="croissance">Croissance</option>
              <option value="floraison">Floraison</option>
            </select>
          )}
        />
        {errors.fertilizerApplication?.message && (
          <p className="text-red-500 text-sm">{String(errors.fertilizerApplication.message)}</p>
        )}
      </div>

      {/* Produits phytosanitaires */}
      <div>
        <label className="block font-medium">Produits phytosanitaires :</label>
        <Controller
          name="pesticides"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="w-full border rounded-lg p-2"
              placeholder="Entrez les produits phytosanitaires (optionnel)"
            />
          )}
        />
        {errors.pesticides?.message && (
          <p className="text-red-500 text-sm">{String(errors.pesticides.message)}</p>
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
