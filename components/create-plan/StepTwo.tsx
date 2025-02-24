// "use client";

// import { Controller, useFormContext } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// export const StepTwoSchema = z.object({
//   soilType: z.enum(["argileux", "sableux", "limoneux", "terreau"], {
//     required_error: "Veuillez sélectionner un type de sol.",
//   }),
//   soilPH: z.enum(["acide", "neutre", "basique"], {
//     required_error: "Veuillez sélectionner le niveau de pH.",
//   }),
//   soilFertility: z.enum(["faible", "moyenne", "élevée"], {
//     required_error: "Veuillez sélectionner le niveau de fertilité.",
//   }),
//   organicMatter: z.boolean(),
// });

// interface StepTwoProps {
//     onNext: () => void;
//     onBack: () => void;
//   }
  
// export default function StepTwo({ onNext, onBack }: StepTwoProps) {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div className=" lg:mx-auto lg:max-w-5xl p-4 border bg-white rounded-lg shadow-md space-y-4">
//       <h2 className="text-xl font-bold">Étape 2 : Caractéristiques du sol</h2>
      
//       {/* Type de sol */}
//       <div>
//         <label className="block font-medium">Type de sol :</label>
//         <Controller
//           name="soilType"
//           control={control}
//           render={({ field }) => (
//             <select {...field} className="w-full border rounded-lg p-2">
//               <option value="">-- Sélectionnez --</option>
//               <option value="argileux">Argileux</option>
//               <option value="sableux">Sableux</option>
//               <option value="limoneux">Limoneux</option>
//               <option value="terreau">Terreau</option>
//             </select>
//           )}
//         />
//         {errors.soilType?.message && (
//           <p className="text-red-500 text-sm">{String(errors.soilType.message)}</p>
//         )}
//       </div>
      
//       {/* Niveau de pH */}
//       <div>
//         <label className="block font-medium">Niveau de pH :</label>
//         <Controller
//           name="soilPH"
//           control={control}
//           render={({ field }) => (
//             <select {...field} className="w-full border rounded-lg p-2">
//               <option value="">-- Sélectionnez --</option>
//               <option value="acide">Acide</option>
//               <option value="neutre">Neutre</option>
//               <option value="basique">Basique</option>
//             </select>
//           )}
//         />
//         {errors.soilPH?.message && (
//           <p className="text-red-500 text-sm">{String(errors.soilPH.message)}</p>
//         )}
//       </div>
      
//       {/* Fertilité du sol */}
//       <div>
//         <label className="block font-medium">Fertilité du sol :</label>
//         <Controller
//           name="soilFertility"
//           control={control}
//           render={({ field }) => (
//             <select {...field} className="w-full border rounded-lg p-2">
//               <option value="">-- Sélectionnez --</option>
//               <option value="faible">Faible</option>
//               <option value="moyenne">Moyenne</option>
//               <option value="élevée">Élevée</option>
//             </select>
//           )}
//         />
//         {errors.soilFertility?.message && (
//           <p className="text-red-500 text-sm">{String(errors.soilFertility?.message)}</p>
//         )}
//       </div>
      
//       {/* Présence de matières organiques */}
//       <div>
//         <label className="flex items-center space-x-2">
//           <Controller
//             name="organicMatter"
//             control={control}
//             render={({ field }) => (
//               <input type="checkbox" {...field} checked={field.value} />
//             )}
//           />
//           <span>Présence de matières organiques</span>
//         </label>
//       </div>
//         <div className="grid grid-cols-2 gap-x-36">
//             <button onClick={onBack} className="px-4 py-2 bg-green-300 rounded">
//                 Retour
//             </button>
//             <button onClick={onNext} className="px-4 py-2 bg-green-500 text-white rounded">
//                 Suivant
//             </button>
//         </div>

//     </div>
//   );
// }


"use client";

import { Controller, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const StepTwoSchema = z.object({
  soilType: z.enum(["argileux", "sableux", "limoneux", "terreau"], {
    required_error: "Veuillez sélectionner un type de sol.",
  }),
  soilPH: z.enum(["acide", "neutre", "basique"], {
    required_error: "Veuillez sélectionner le niveau de pH.",
  }),
  soilFertility: z.enum(["faible", "moyenne", "élevée"], {
    required_error: "Veuillez sélectionner le niveau de fertilité.",
  }),
  organicMatter: z.boolean(),
});

interface StepTwoProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepTwo({ onNext, onBack }: StepTwoProps) {
  const {
    control,
    formState: { errors },
    trigger, // Pour déclencher la validation manuellement
  } = useFormContext();

  const handleNextStep = async () => {
    // Validation manuelle pour l'étape 2
    const isValid = await trigger(["soilType", "soilPH", "soilFertility", "organicMatter"]);
    
    if (isValid) {
      // Si les champs sont valides, on passe à l'étape suivante
      onNext();
    } else {
      // Si les champs ne sont pas valides, les erreurs s'affichent automatiquement
      console.log("Veuillez corriger les erreurs.");
    }
  };

  return (
    <div className=" lg:mx-auto lg:max-w-5xl p-4 border bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-bold">Étape 2 : Caractéristiques du sol</h2>
      
      {/* Type de sol */}
      <div>
        <label className="block font-medium">Type de sol :</label>
        <Controller
          name="soilType"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full border rounded-lg p-2">
              <option value="">-- Sélectionnez --</option>
              <option value="argileux">Argileux</option>
              <option value="sableux">Sableux</option>
              <option value="limoneux">Limoneux</option>
              <option value="terreau">Terreau</option>
            </select>
          )}
        />
        {errors.soilType?.message && (
          <p className="text-red-500 text-sm">{String(errors.soilType.message)}</p>
        )}
      </div>
      
      {/* Niveau de pH */}
      <div>
        <label className="block font-medium">Niveau de pH :</label>
        <Controller
          name="soilPH"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full border rounded-lg p-2">
              <option value="">-- Sélectionnez --</option>
              <option value="acide">Acide</option>
              <option value="neutre">Neutre</option>
              <option value="basique">Basique</option>
            </select>
          )}
        />
        {errors.soilPH?.message && (
          <p className="text-red-500 text-sm">{String(errors.soilPH.message)}</p>
        )}
      </div>
      
      {/* Fertilité du sol */}
      <div>
        <label className="block font-medium">Fertilité du sol :</label>
        <Controller
          name="soilFertility"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full border rounded-lg p-2">
              <option value="">-- Sélectionnez --</option>
              <option value="faible">Faible</option>
              <option value="moyenne">Moyenne</option>
              <option value="élevée">Élevée</option>
            </select>
          )}
        />
        {errors.soilFertility?.message && (
          <p className="text-red-500 text-sm">{String(errors.soilFertility?.message)}</p>
        )}
      </div>
      
      {/* Présence de matières organiques */}
      <div>
        <label className="flex items-center space-x-2">
          <Controller
            name="organicMatter"
            control={control}
            render={({ field }) => (
              <input type="checkbox" {...field} checked={field.value} />
            )}
          />
          <span>Présence de matières organiques</span>
        </label>
      </div>
      
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
