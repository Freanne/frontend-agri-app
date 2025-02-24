// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useForm, FormProvider } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// import StepOne from "./StepOne";
// import StepTwo from "./StepTwo";
// import StepThree from "./StepThree";
// import StepFour from "./StepFour";
// import StepFive from "./StepFive";
// import StepSix from "./StepSix";
// import StepSeven from "./StepSeven";

// // Validation schema
// const formSchema = z.object({
//   farmName: z.string().min(3, "Le nom de la ferme doit comporter au moins 3 caractères"),
//   location: z.string().min(3, "L'emplacement est requis"),
//   maizeVariety: z.enum(["Maïs farineux", "Maïs tendre",], {
//     required_error: "Veuillez sélectionner une variété de maïs.",
//   }),
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
//   seedVariety: z.enum(["hybride", "local", "gm"], {
//     required_error: "Veuillez sélectionner une variété de semence.",
//   }),
//   seedQuantity: z.preprocess(
//     (val) => (typeof val === "string" ? parseFloat(val) : val),
//     z.number().min(1, "Veuillez entrer une quantité valide.")
//   ),
//   spacing: z.preprocess(
//     (val) => (typeof val === "string" ? parseFloat(val) : val),
//     z.number().min(1, "Veuillez entrer une valeur valide.")
//   ),
//   irrigationType: z.enum(["goutte", "aspersion", "manuelle", "naturelle"], {
//     required_error: "Veuillez sélectionner un type d'irrigation.",
//   }),
//   irrigationFrequency: z.preprocess(
//     (val) => (typeof val === "string" ? parseFloat(val) : val),
//     z.number().min(1, "Veuillez entrer une fréquence.")
//   ),

//   fertilizerType: z.enum(["organique", "chimique"], {
//     required_error: "Veuillez sélectionner un type d'engrais.",
//   }),
//   fertilizerQuantity: z.number().min(1, "Veuillez entrer une quantité d'engrais valide."),
//   fertilizerApplication: z.enum(["pré-plantation", "croissance", "floraison"], {
//     required_error: "Veuillez sélectionner un moment d'application.",
//   }),
//   pesticides: z.string().min(3,"veuillez entrer "),
//   startDate: z.string().nonempty("Veuillez entrer une date."),
//   duration: z.number().min(1, "Veuillez entrer une durée."),
//   workforce: z.number().min(1, "Veuillez entrer le nombre de travailleurs."),
//   equipment: z.string().optional(),
//   diseaseHistory: z.enum(["aucune", "rouille", "charbon", "cercosporiose"]),
//   pestControl: z.enum(["biologique", "chimique", "précautions"]),
//   harvestDate: z.string().nonempty("Veuillez entrer une date."),
//   harvestMethod: z.enum(["manuelle", "mécanisée"]),
//   storageLocation: z.enum(["grenier", "entrepôt"]),
//   yieldEstimation: z.number().min(0, "Veuillez entrer une estimation valide."),
// });

// type FormData = z.infer<typeof formSchema>;

// const CropPlanForm = (  ) => {
//   const [currentStep, setCurrentStep] = useState(1);

//   const methods = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//     farmName: "",
//     location: "",
//     maizeVariety: "Maïs farineux",  // Initialisation avec une valeur par défaut
//     soilType: "argileux",  // Initialisation avec une valeur par défaut
//     soilPH: "neutre",  // Initialisation avec une valeur par défaut
//     soilFertility: "faible",  // Initialisation avec une valeur par défaut
//     organicMatter: false,
//     seedVariety: "hybride",  // Initialisation avec une valeur par défaut
//     seedQuantity: 1,  // Initialisation avec une valeur par défaut
//     spacing: 10,  // Initialisation avec une valeur par défaut
//     irrigationType: "goutte",  // Initialisation avec une valeur par défaut
//     irrigationFrequency: 1,  // Initialisation avec une valeur par défaut
//     fertilizerType: "organique",  // Initialisation avec une valeur par défaut
//     fertilizerQuantity: 1,  // Initialisation avec une valeur par défaut
//     fertilizerApplication: "pré-plantation",  // Initialisation avec une valeur par défaut
//     pesticides: "",
//     startDate: "",
//     duration: 1,  // Initialisation avec une valeur par défaut
//     workforce: 1,  // Initialisation avec une valeur par défaut
//     equipment: "",
//     diseaseHistory: "aucune",  // Initialisation avec une valeur par défaut
//     pestControl: "biologique",  // Initialisation avec une valeur par défaut
//     harvestDate: "",
//     harvestMethod: "manuelle",  // Initialisation avec une valeur par défaut
//     storageLocation: "grenier",  // Initialisation avec une valeur par défaut
//     yieldEstimation: 0, 
//     },
//   });

  
//   const moveToNextStep = () => setCurrentStep((prev) => prev + 1);
  

//   const moveToPreviousStep = () => setCurrentStep((prev) => prev - 1);

//   // Calcul du progrès basé sur l'étape actuelle et le total des étapes
//   const progress = ((currentStep - 1) / 7) * 100;  // 7 étapes dans le formulaire


//   const steps = [
//     StepOne,
//     StepTwo,
//     StepThree,
//     StepFour,
//     StepFive,
//     StepSix,
//     StepSeven,
//   ];
  
//   const StepComponent = steps[currentStep - 1];

  
//   return (
//     <FormProvider {...methods}>
//       <div className="mx-4 lg:max-w-7xl lg:mx-auto">
//         <h1 className="text-xl font-semibold mb-8 flex items-center justify-center">
//           Créer votre plan de culture
//         </h1>

//         <div className="relative w-full h-1 bg-gray-200 rounded-lg mb-6">
//           <motion.div
//             className="absolute top-0 left-0 h-1 bg-green-500 rounded-lg"
//             style={{ width: `${progress}%` }}
//             initial={{ width: 0 }}
//             animate={{ width: `${progress}%` }}
//             transition={{ duration: 0.5 }}
//           />
//         </div>
//         <StepComponent onNext={moveToNextStep} onBack={moveToPreviousStep} />
//       </div>
//     </FormProvider>
//   );
// }
// export default CropPlanForm;


"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";
import StepSeven from "./StepSeven";

// Validation schema
const formSchema = z.object({
  farmName: z.string().min(3, "Le nom de la ferme doit comporter au moins 3 caractères"),
  location: z.string().min(3, "L'emplacement est requis"),
  maizeVariety: z.enum(["Maïs farineux", "Maïs tendre"]),
  soilType: z.enum(["argileux", "sableux", "limoneux", "terreau"]),
  soilPH: z.enum(["acide", "neutre", "basique"]),
  soilFertility: z.enum(["faible", "moyenne", "élevée"]),
  organicMatter: z.boolean(),
  seedVariety: z.enum(["hybride", "local", "gm"]),
  seedQuantity: z.preprocess((val) => (typeof val === "string" ? parseFloat(val) : val), z.number().min(1)),
  spacing: z.preprocess((val) => (typeof val === "string" ? parseFloat(val) : val), z.number().min(1)),
  irrigationType: z.enum(["goutte", "aspersion", "manuelle", "naturelle"]),
  irrigationFrequency: z.preprocess((val) => (typeof val === "string" ? parseFloat(val) : val), z.number().min(1)),
  fertilizerType: z.enum(["organique", "chimique"]),
  fertilizerQuantity: z.number().min(1),
  fertilizerApplication: z.enum(["pré-plantation", "croissance", "floraison"]),
  pesticides: z.string().min(3),
  startDate: z.string().nonempty(),
  duration: z.number().min(1),
  workforce: z.number().min(1),
  equipment: z.string().optional(),
  diseaseHistory: z.enum(["aucune", "rouille", "charbon", "cercosporiose"]),
  pestControl: z.enum(["biologique", "chimique", "précautions"]),
  harvestDate: z.string().nonempty(),
  harvestMethod: z.enum(["manuelle", "mécanisée"]),
  storageLocation: z.enum(["grenier", "entrepôt"]),
  yieldEstimation: z.number().min(0),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
  StepSix,
  StepSeven,
];

const initialFormValues: FormData = {
  farmName: "",
  location: "",
  maizeVariety: "Maïs farineux",
  soilType: "argileux",
  soilPH: "neutre",
  soilFertility: "faible",
  organicMatter: false,
  seedVariety: "hybride",
  seedQuantity: 1,
  spacing: 10,
  irrigationType: "goutte",
  irrigationFrequency: 1,
  fertilizerType: "organique",
  fertilizerQuantity: 1,
  fertilizerApplication: "pré-plantation",
  pesticides: "",
  startDate: "",
  duration: 1,
  workforce: 1,
  equipment: "",
  diseaseHistory: "aucune",
  pestControl: "biologique",
  harvestDate: "",
  harvestMethod: "manuelle",
  storageLocation: "grenier",
  yieldEstimation: 0,
};

const CropPlanForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitVisible, setIsSubmitVisible] = useState(false);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialFormValues,
  });

  const moveToNextStep = () => {
    if (currentStep === 7) {
      setIsSubmitVisible(true); // Afficher le bouton Soumettre
    }
    setCurrentStep(currentStep + 1);
  };
  const moveToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setIsSubmitVisible(false); // Cacher le bouton Soumettre si on revient en arrière
    }
  };

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const StepComponent = steps[currentStep - 1];

  return (
    <FormProvider {...methods}>
      <div className="mx-4 lg:max-w-7xl lg:mx-auto">
        <h1 className="text-xl font-semibold mb-8 text-center">Créer votre plan de culture</h1>

        <div className="relative w-full h-1 bg-gray-200 rounded-lg mb-6">
          <motion.div
            className="absolute top-0 left-0 h-1 bg-green-500 rounded-lg"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <StepComponent onNext={moveToNextStep} onBack={moveToPreviousStep} />

          {/* {isSubmitVisible && (
                    <div className="flex justify-center mt-4">
                      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                        Soumettre
                      </button>
                    </div>
                  )} */}
          {/* Si l'utilisateur n'est pas encore à l'étape 7, continuez à afficher les boutons de navigation */}
          {/* {!showSubmitButton && (
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={moveToPreviousStep}
                className="btn btn-secondary"
                disabled={currentStep === 1}
              >
                Précédent
              </button>
              <button
                type="button"
                onClick={moveToNextStep}
                className="btn btn-primary"
              >
                Suivant
              </button>
            </div>
          )} */}
      </div>
    </FormProvider>
  );
};

export default CropPlanForm;
