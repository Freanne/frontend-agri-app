"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const ConsultationListComponent = () => {
  const [farms, setFarms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useAuth()

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get(`http://localhost:8000/api/consultations/expert/${user?.id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setFarms(response.data);
        console.log(response.data)
        // setFarms(response.data);
      } catch (err) {
        setError("❌ Erreur lors du chargement des consultations.");
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer cette ferme ?")) {
      try {
        const token = localStorage.getItem("auth_token");
        await axios.delete(`http://localhost:8000/api/farms/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setFarms(farms.filter((farm) => farm.id !== id));
      } catch (err) {
        setError("❌ Erreur lors de la suppression de la ferme.");
      }
    }
  };

  return (
    <div className="mx-4 lg:max-w-6xl lg:mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-2xl font-bold text-center text-dark-green mb-6">
      🌾 Liste des Consultations
    </h2>
  
    {loading ? (
      <div className="flex justify-center items-center bg-green-100 h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-dark-green"></div>
      </div>
    ) : error ? (
      <p className="text-center text-red-600 font-medium">{error}</p>
    ) : farms.length === 0 ? (
      <p className="text-center text-gray-600">Aucune consultation disponible.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {farms.map((farm) => (
          <div key={farm.id} className="bg-green-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-lg font-semibold text-dark-green">Consultation {farm.id}</h3>
            <p className="text-gray-700">Message de consultation: {farm.message}</p>
            <p className="text-gray-700">Expert ID: {farm.expert_id}</p>
            <p className="text-gray-700">Date de demande: {new Date(farm.created_at).toLocaleDateString()}</p>
            <button
              onClick={() => router.push(`/dashboard/agriculteur/consultations/${farm.id}`)}
              className="mt-3 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
            >
              {loading ? 'Chargement...' : 'Envoyez des messages' }
  
              {/* Envoyez des messages */}
            </button>
          </div>
        ))}
      </div>
    // <div className="mx-4 lg:max-w-6xl lg:mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
    //   <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">🌾 Liste des Consultations</h2>

    //   {loading ? (
    //     <div className="flex justify-center items-center h-40">
    //       <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-500"></div>
    //     </div>
    //   ) : error ? (
    //     <p className="text-center text-red-600 font-medium">{error}</p>
    //   ) : farms.length === 0 ? (
    //     <p className="text-center text-gray-600">Aucune consultation disponible.</p>
    //   ) : (
    //     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    //       {farms.map((farm) => (
    //         <div key={farm.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
    //           <h3 className="text-lg font-semibold text-gray-800">Consultation {farm.id}</h3>
    //           <p className="text-gray-600">Message de consultation: {farm.message}</p>
    //           <p className="text-gray-600"> Expert id: {farm.expert_id}</p>
    //           <p className="text-gray-600">Date de demande: {new Date(farm.created_at).toLocaleDateString()}</p>
    //           <button
    //                   onClick={() => router.push(`/dashboard/expert/consultation/${farm.id}`)}
    //                   className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-300"
    //                 >
    //                   Voir les messages de cette consultations avec l'expert  📅
    //           </button>
    //         </div>
    //       ))}
    //     </div>
      )}

      {/* <div className="mt-6 flex flex-col sm:flex-row justify-between gap-2">
        <button
          onClick={() => router.push("/dashboard/agriculteur/farm/create")}
          className="w-full sm:w-auto bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Ajouter une ferme
        </button>
        <button
          onClick={() => router.back()}
          className="w-full sm:w-auto border border-gray-600 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          ⬅️ Retour
        </button>
      </div> */}
    </div>
  );
};

export default ConsultationListComponent;