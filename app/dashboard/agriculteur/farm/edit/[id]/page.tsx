"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

const EditFarm = () => {
  const { id } = useParams();
  const router = useRouter();
  const [farm, setFarm] = useState({ name: "", location: "", area: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  // Charger les infos de la ferme
  useEffect(() => {

    setLoading(true);
    setMessage("");
    const fetchFarm = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get(`http://localhost:8000/api/farms/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setFarm(response.data);
      } catch (err) {
        setError("❌ Erreur lors du chargement de la ferme.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchFarm();
  }, [id]);

  // Gestion de la mise à jour
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("auth_token");
      await axios.put(`http://localhost:8000/api/farms/${id}`, farm, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setMessage(`✅ Mise à jour réussie !`);
      setTimeout(() => router.push("/dashboard/agriculteur/farm/list"), 1500);
      router.push("/dashboard/agriculteur/farm/list"); // Redirection après mise à jour
    } catch (err) {
      setError("❌ Erreur lors de la mise à jour.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">✏️ Modifier la Ferme</h2>
{/* 
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : ( */}
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            value={farm.name}
            onChange={(e) => setFarm({ ...farm, name: e.target.value })}
            className="w-full p-2 border rounded-lg"
            placeholder="Nom de la ferme"
          />
          <input
            type="text"
            value={farm.location}
            onChange={(e) => setFarm({ ...farm, location: e.target.value })}
            className="w-full p-2 border rounded-lg"
            placeholder="Localisation"
          />
          <input
            type="number"
            value={farm.area}
            onChange={(e) => setFarm({ ...farm, area: e.target.value })}
            className="w-full p-2 border rounded-lg"
            placeholder="Superficie (hectares)"
          />
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 text-white font-semibold rounded-lg ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Mise à jour en cours..." : "Mettre à jour"}
        </button>
          <button
            onClick={() => router.back()}
            className="w-full border border-gray-600 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            ⬅️ Annuler
          </button>
        </form>
        
        {message && (
        <p className={`mt-4 p-2 text-center font-medium ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

    </div>
  );
};

export default EditFarm;
