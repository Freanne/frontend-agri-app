import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";

const diseaseSchema = z.object({
  name: z.string().min(3, "Le nom est trop court"),
  symptoms: z.string().min(5, "Les symptômes sont trop courts"),
  treatment: z.string().min(5, "Le traitement est trop court"),
});

type DiseaseFormData = z.infer<typeof diseaseSchema>;

interface DiseaseFormProps {
  disease?: { id: number; name: string; symptoms: string; treatment: string };
  onSuccess: () => void;
}

export default function DiseaseForm({ disease, onSuccess }: DiseaseFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DiseaseFormData>({
    resolver: zodResolver(diseaseSchema),
    defaultValues: disease || { name: "", symptoms: "", treatment: "" },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: DiseaseFormData) => {
    setLoading(true);
    const token = localStorage.getItem("auth_token");
    try {
      if (disease) {
        await axios.put(`http://localhost:8000/api/diseases/${disease.id}`, data,
            {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            }
        );
      } else {
        await axios.post("http://localhost:8000/api/diseases", data,
            {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            }
        );
      }
      onSuccess();
    } catch (err) {
      alert("Erreur lors de l'enregistrement !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">{disease ? "Modifier la maladie" : "Ajouter une maladie"}</h2>
      
      <label className="block mb-2">Nom:</label>
      <input {...register("name")} className="w-full p-2 border rounded" />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <label className="block mt-2">Symptômes:</label>
      <textarea {...register("symptoms")} className="w-full p-2 border rounded" />
      {errors.symptoms && <p className="text-red-500">{errors.symptoms.message}</p>}

      <label className="block mt-2">Traitement:</label>
      <textarea {...register("treatment")} className="w-full p-2 border rounded" />
      {errors.treatment && <p className="text-red-500">{errors.treatment.message}</p>}

      <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
        {loading ? "Enregistrement..." : disease ? "Modifier" : "Ajouter"}
      </button>
    </form>
  );
}
