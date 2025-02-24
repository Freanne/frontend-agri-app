"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import EditFarmForm from "@/components/dashboard/agriculteur/farm/edit";

const EditFarm = () => {
  const [farm, setFarm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const farmId = searchParams.get("id"); // Récupère l'id de la ferme depuis l'URL

  useEffect(() => {
    if (!farmId) {
      setError("Aucune ferme sélectionnée.");
      setLoading(false);
      return;
    }

    const fetchFarm = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get(`http://localhost:8000/api/farms/${farmId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFarm(response.data);
      } catch (err) {
        setError("Erreur lors de la récupération de la ferme.");
      } finally {
        setLoading(false);
      }
    };

    fetchFarm();
  }, [farmId]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!farm) return <p>Ferme introuvable.</p>;

  return (
    <div>
      <EditFarmForm farm={farm} />
    </div>
  );
};

export default EditFarm;
