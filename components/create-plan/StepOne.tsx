// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// const stepOneSchema = z.object({
//   farmName: z.string().min(3, "Le nom de la ferme doit comporter au moins 3 caractères"),
//   location: z.string().min(3, "L'emplacement est requis"),
// });

// type StepOneData = z.infer<typeof stepOneSchema>;

// interface StepOneProps {
//   onNext: () => void;
// }

// export default function StepOne({ onNext }: StepOneProps) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<StepOneData>({ resolver: zodResolver(stepOneSchema) });

//   const onSubmit = (data: StepOneData) => {
//     console.log(data);
//     onNext();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="lg:max-w-5xl lg:mx-auto space-y-4 bg-white p-4 rounded-lg">
//               <h2 className="text-xl font-bold">Étape 1 : Informations sur la parcelle à cultiver</h2>
//       <div>
//         <label className="block text-sm font-medium">Nom de la ferme</label>
//         <input
//           {...register("farmName")}
//           className="w-full border rounded-lg p-2"
//           placeholder="Ex: Ferme du Soleil"
//         />
//         {errors.farmName && <p className="text-red-500 text-sm">{errors.farmName.message}</p>}
//       </div>
//       <div>
//         <label className="block text-sm font-medium">Emplacement</label>
//         <input
//           {...register("location")}
//           className="w-full border rounded-lg p-2"
//           placeholder="Ex: Bénin, Cotonou"
//         />
//         {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
//       </div>
//       <div className="grid grid-cols-2">
//         <div>

//         </div>
//         <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
//             Suivant
//         </button>
//       </div>
//     </form>
//   );
// }

// "use client";

// import { useFormContext } from "react-hook-form"; // Utilisation de FormContext
// import { z } from "zod";

// // Schéma de validation pour l'étape 1
// const stepOneSchema = z.object({
//   farmName: z.string().min(3, "Le nom de la ferme doit comporter au moins 3 caractères"),
//   location: z.string().min(3, "L'emplacement est requis"),
// });

// type StepOneData = z.infer<typeof stepOneSchema>;

// interface StepOneProps {
//   onNext: () => void;
// }

// export default function StepOne({ onNext }: StepOneProps) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     trigger,
//   } = useFormContext<StepOneData>(); // Accéder au contexte du formulaire

//   const onSubmit = (data: StepOneData) => {
//     console.log(data);
//     onNext();
//   };

//   const handleNext = async () => {
//     const isValid = await trigger(); // Force la validation
//     if (isValid) {
//       onNext();
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="lg:max-w-5xl lg:mx-auto space-y-4 bg-white p-4 rounded-lg">
//       <h2 className="text-xl font-bold">Étape 1 : Informations sur la parcelle à cultiver</h2>

//       <div>
//         <label className="block text-sm font-medium">Nom de la ferme</label>
//         <input
//           {...register("farmName")}
//           className="w-full border rounded-lg p-2"
//           placeholder="Ex: Ferme du Soleil"
//         />
//         {errors.farmName && <p className="text-red-500 text-sm">{errors.farmName.message}</p>}
//       </div>

//       <div>
//         <label className="block text-sm font-medium">Emplacement</label>
//         <input
//           {...register("location")}
//           className="w-full border rounded-lg p-2"
//           placeholder="Ex: Bénin, Cotonou"
//         />
//         {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
//       </div>

//       <div className="grid grid-cols-2">
//         <div></div>
//         <button
//           type="button"
//           onClick={handleNext}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Suivant
//         </button>
//       </div>
//     </form>
//   );
// }


// "use client";

// import { useFormContext,Controller } from "react-hook-form"; // Utilisation de FormContext
// import { z } from "zod";

// // Schéma de validation pour l'étape 1
// const stepOneSchema = z.object({
//   farmName: z.string().min(3, "Le nom de la ferme doit comporter au moins 3 caractères"),
//   location: z.string().min(3, "L'emplacement est requis"),
// });

// // type StepOneData = z.infer<typeof stepOneSchema>;

// interface StepOneProps {
//   onNext: () => void;
// }

// export default function StepOne({ onNext }: StepOneProps) {
//   const {
//     control,
//     formState: { errors },
//     trigger,
//   } = useFormContext(); // Accéder au contexte du formulaire

//   const handleNextStep = async () => {
//     // Validation manuelle pour l'étape 2
//     const isValid = await trigger(["farmName, location"]);
    
//     if (isValid) {
//       // Si les champs sont valides, on passe à l'étape suivante
//       onNext();
//     } else {
//       // Si les champs ne sont pas valides, les erreurs s'affichent automatiquement
//       console.log("Veuillez corriger les erreurs.");
//     }
//   };

//   return (
//     <div className="lg:max-w-5xl lg:mx-auto space-y-4 bg-white p-4 rounded-lg">
//       <h2 className="text-xl font-bold">Étape 1 : Informations sur la parcelle à cultiver</h2>

//       {/* <div>
//         <label className="block text-sm font-medium">Nom de la ferme</label>
//         <input
//           {...register("farmName")}
//           className="w-full border rounded-lg p-2"
//           placeholder="Ex: Ferme du Soleil"
          
//         />
//         {errors.farmName && <p className="text-red-500 text-sm">{errors.farmName.message}</p>}
//       </div> */}

//     <div>
//         <label className="block font-medium">Nom de la ferme:</label>
//         <Controller
//           name="farmName"
//           control={control}
//           render={({ field }) => (
//             <input
//               type="text"
//               {...field}
//               className="w-full border rounded-lg p-2"
//               placeholder="Entrez la quantité"
//             />
//           )}
//         />
//         {errors.farmName?.message && (
//           <p className="text-red-500 text-sm">{String(errors.farmName.message)}</p>
//         )}
//       </div>

//       <div>
//         <label className="block font-medium">Emplacement</label>
//         <Controller
//           name="location"
//           control={control}
//           render={({ field }) => (
//             <input
//               type="text"
//               {...field}
//               className="w-full border rounded-lg p-2"
//               placeholder="Entrez la quantité"
//             />
//           )}
//         />
//         {errors.location?.message && (
//           <p className="text-red-500 text-sm">{String(errors.location.message)}</p>
//         )}
//       </div>
//       {/* <div>
//         <label className="block text-sm font-medium">Emplacement</label>
//         <input
//           {...register("location")}
//           className="w-full border rounded-lg p-2"
//           placeholder="Ex: Bénin, Cotonou"
//         />
//         {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
//       </div> */}


//       <div className="grid grid-cols-2">
//         <div></div>
//         <button
//           type="button"
//           onClick={handleNextStep}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Suivant
//         </button>
//       </div>
//     </div>
//   );
// }



"use client";

import { useFormContext, Controller } from "react-hook-form"; // Utilisation de FormContext
import { z } from "zod";

// Schéma de validation pour l'étape 1
const stepOneSchema = z.object({
  farmName: z.string().min(3, "Le nom de la ferme doit comporter au moins 3 caractères"),
  location: z.string().min(3, "L'emplacement est requis"),
  maizeVariety: z.enum(["Maïs farineux", "Maïs tendre",], {
    required_error: "Veuillez sélectionner une variété de maïs.",
  }),
});

interface StepOneProps {
  onNext: () => void;
}

export default function StepOne({ onNext }: StepOneProps) {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext(); // Accéder au contexte du formulaire

  const handleNextStep = async () => {
    // Validation manuelle pour l'étape 1
    const isValid = await trigger(["farmName", "location","maizeVariety"]);

    if (isValid) {
      // Si les champs sont valides, on passe à l'étape suivante
      onNext();
    } else {
      // Si les champs ne sont pas valides, les erreurs s'affichent automatiquement
      console.log("Veuillez corriger les erreurs.");
    }
  };

  return (
    <div className="lg:max-w-5xl lg:mx-auto space-y-4 bg-white p-4 rounded-lg">
      <h2 className="text-xl font-bold">Étape 1 : Informations sur la parcelle à cultiver</h2>

      <div>
        <label className="block font-medium">Nom de la ferme:</label>
        <Controller
          name="farmName"
          control={control}
          render={({ field }) => (
            <input
              type="text"
              {...field}
              className="w-full border rounded-lg p-2"
              placeholder="Ex: Ferme du Soleil"
            />
          )}
        />
        {errors.farmName?.message && (
          <p className="text-red-500 text-sm">{String(errors.farmName.message)}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Emplacement</label>
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <input
              type="text"
              {...field}
              className="w-full border rounded-lg p-2"
              placeholder="Ex: Bénin, Cotonou"
            />
          )}
        />
        {errors.location?.message && (
          <p className="text-red-500 text-sm">{String(errors.location.message)}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Variété de semence :</label>
        <Controller
          name="maizeVariety"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full border rounded-lg p-2">
              <option value="">-- Sélectionnez --</option>
              <option value="Maïs farineux">Maïs farineux</option>
              <option value="Maïs tendre">Maïs tendre</option>

            </select>
          )}
        />
        {errors.maizeVariety?.message && (
          <p className="text-red-500 text-sm">{String(errors.maizeVariety.message)}</p>
        )}
      </div>

      <div className="grid grid-cols-2">
        <div></div>
        <button
          type="button"
          onClick={handleNextStep}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
