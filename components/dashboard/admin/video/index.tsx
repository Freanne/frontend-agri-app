import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useState } from "react";
import axios from "axios";

const videoSchema = z.object({
  title: z.string().min(3, "Le titre est trop court"),
  link: z.string().url("Lien invalide"),
  description: z.string().min(5, "La description est trop courte"),
});

type VideoFormData = z.infer<typeof videoSchema>;

interface VideoFormProps {
  video?: { id: number; title: string; link: string; description: string };
  onSuccess: () => void;
}

export default function VideoForm({ video, onSuccess }: VideoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VideoFormData>({
    resolver: zodResolver(videoSchema),
    defaultValues: video || { title: "", link: "", description: "" },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: VideoFormData) => {
    setLoading(true);
    const token = localStorage.getItem("auth_token");
    try {
        
      if (video) {
        await axios.put(`http://localhost:8000/api/videos/${video.id}`, data,
            {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            }
        );
      } else {
        await axios.post("http://localhost:8000/api/videos", data,
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
      <h2 className="text-xl font-bold mb-4">{video ? "Modifier la vidéo" : "Ajouter une vidéo"}</h2>
      <label className="block mb-2">Titre:</label>
      <input {...register("title")} className="w-full p-2 border rounded" />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <label className="block mt-2">Lien:</label>
      <input {...register("link")} className="w-full p-2 border rounded" />
      {errors.link && <p className="text-red-500">{errors.link.message}</p>}

      <label className="block mt-2">Description:</label>
      <textarea {...register("description")} className="w-full p-2 border rounded" />
      {errors.description && <p className="text-red-500">{errors.description.message}</p>}

      <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
        {loading ? "Enregistrement..." : video ? "Modifier" : "Ajouter"}
      </button>
    </form>
  );
}
