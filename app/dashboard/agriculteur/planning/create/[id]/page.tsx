"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useParams } from "next/navigation";

export default function CreateCultivationPlan() {
    const router = useRouter();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        maize_variety: "",
        soil_type: "",
        season_type: "",
        irrigation_method: "",
        fertilizer_type: "",
        sowing_date: "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
      const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
          const token = localStorage.getItem("auth_token");
            const response = await axios.post(
                `http://localhost:8000/api/cultivation-plans/${id}`,
                formData,
                {
                  headers: { Authorization: `Bearer ${token}` },
                  withCredentials: true,
                }
            );
            alert("Plan de culture créé avec succès !");
            router.push(`/dashboard/agriculteur/events/${id}`);
        } catch (err : any) {
            setError(err.response?.data?.message || "Une erreur est survenue");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-xl font-bold mb-4">Créer un plan de culture</h1>
            {error && <p className="text-red-500">{error}</p>}
            {/* <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Variété de maïs</label>
                    <input type="text" name="maize_variety" value={formData.maize_variety} onChange={handleChange} className="w-full border rounded p-2" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Type de sol</label>
                    <input type="text" name="soil_type" value={formData.soil_type} onChange={handleChange} className="w-full border rounded p-2" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Type de saison</label>
                    <input type="text" name="season_type" value={formData.season_type} onChange={handleChange} className="w-full border rounded p-2" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Méthode d'irrigation</label>
                    <input type="text" name="irrigation_method" value={formData.irrigation_method} onChange={handleChange} className="w-full border rounded p-2" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Type d'engrais</label>
                    <input type="text" name="fertilizer_type" value={formData.fertilizer_type} onChange={handleChange} className="w-full border rounded p-2" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Date de semis</label>
                    <input type="date" name="sowing_date" value={formData.sowing_date} onChange={handleChange} className="w-full border rounded p-2" required />
                </div>
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Créer</button>
            </form> */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Variété de maïs</label>
            <select name="maize_variety" value={formData.maize_variety} onChange={handleChange} className="w-full border rounded p-2" required>
              <option value="">Sélectionnez une variété</option>
              <option value="farineux">Farineux</option>
              <option value="doux">Doux</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Type de sol</label>
            <select name="soil_type" value={formData.soil_type} onChange={handleChange} className="w-full border rounded p-2" required>
              <option value="">Sélectionnez un type de sol</option>
              <option value="argileux">Argileux</option>
              <option value="sablonneux">Sablonneux</option>
              <option value="limoneux">Limoneux</option>
              <option value="humifère">Humifère</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Type de saison</label>
            <select name="season_type" value={formData.season_type} onChange={handleChange} className="w-full border rounded p-2" required>
              <option value="">Sélectionnez un type de saison</option>
              <option value="sèche">Sèche</option>
              <option value="pluvieuse">Pluvieuse</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Méthode d'irrigation</label>
            <select name="irrigation_method" value={formData.irrigation_method} onChange={handleChange} className="w-full border rounded p-2" required>
              <option value="">Sélectionnez une méthode</option>
              <option value="goutte à goutte">Goutte à goutte</option>
              <option value="aspersion">Aspersion</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Type d'engrais</label>
            <select name="fertilizer_type" value={formData.fertilizer_type} onChange={handleChange} className="w-full border rounded p-2" required>
              <option value="">Sélectionnez un type d'engrais</option>
              <option value="npk">NPK</option>
              <option value="urée">Urée</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Date de semis</label>
            <input type="date" name="sowing_date" value={formData.sowing_date} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            Créer
          </button>
        </form>

        </div>
    );
}
