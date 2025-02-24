"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const FarmListComponent = () => {
  const [farms, setFarms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get("http://localhost:8000/api/farms", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        const farmsWithPlans = await Promise.all(
          response.data.map(async (farm: any) => {
            try {
              const planResponse = await axios.get(`http://localhost:8000/api/cultivation-plans/${farm.id}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              });
              return { ...farm, hasCultivationPlan: !!planResponse.data };
            } catch {
              return { ...farm, hasCultivationPlan: false };
            }
          })
        );

        setFarms(farmsWithPlans);
        // setFarms(response.data);
      } catch (err) {
        setError("❌ Erreur lors du chargement des fermes.");
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
    <div className="mx-4 lg:max-w-6xl lg:mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">🌾 Liste des Fermes</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-500"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-600 font-medium">{error}</p>
      ) : farms.length === 0 ? (
        <p className="text-center text-gray-600">Aucune ferme disponible.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {farms.map((farm) => (
            <div key={farm.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">{farm.name}</h3>
              <p className="text-gray-600">Localisation :📍 {farm.location}</p>
              <p className="text-gray-600">Superficie :📏 {farm.area} hectares</p>


              {farm.hasCultivationPlan? (
                  <>
                    <p className="text-green-700 font-medium text-sm my-4">✔️ Plan de culture existant</p>
                    <button
                      onClick={() => router.push(`/dashboard/agriculteur/events/${farm.id}`)}
                      className="bg-green-300 text-black p-2 rounded-lg hover:bg-green-400 transition duration-300"
                    >
                      Voir le plan de culture 📅
                    </button>
                  </>
                ) : (
                  <button
                  onClick={() => router.push(`/dashboard/agriculteur/planning/create/${farm.id}`)}
                  className="mt-12 bg-yellow-600 text-white p-2 rounded-lg hover:bg-yellow-700 transition duration-300"
                >
                  ➕ Créer un plan de culture
                </button>
                )}


<div className="flex mt-4">
              <button
                onClick={() => router.push(`/dashboard/agriculteur/farm/edit/${farm.id}`)}
                className="mt-2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-300"
                >
                Modifier
            </button>
              <button
                onClick={() => handleDelete(farm.id)}
                className="mt-2 flex ml-auto bg-red-600 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                 Supprimer
              </button>
              </div>


              {/* {!farm.hasCultivationPlan && (
                <button
                  onClick={() => router.push(`/dashboard/agriculteur/planning/create/${farm.id}`)}
                  className="mt-2 bg-yellow-600 text-white p-2 rounded-lg hover:bg-yellow-700 transition duration-300"
                >
                  ➕ Créer un plan de culture
                </button>
              )} */}

            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row justify-between gap-2">
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
      </div>
    </div>
  );
};

export default FarmListComponent;

