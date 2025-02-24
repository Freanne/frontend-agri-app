'use client'
import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import DiseaseForm from "@/components/dashboard/admin/disease";
import axios from "axios";

type Disease = {
  id: number;
  name: string;
  symptoms: string;
  treatment: string;
};

export default function AdminDiseases() {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingDisease, setEditingDisease] = useState<Disease | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    const token = localStorage.getItem("auth_token");

    try {
      const response = await axios.get("http://localhost:8000/api/diseases",
        {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        }
      );
      setDiseases(response.data.diseases.data);
    } catch (err) {
      setError("Erreur lors du chargement des maladies.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer cette maladie ?")) {
        const token = localStorage.getItem("auth_token");

      try {
        await axios.delete(`http://localhost:8000/api/diseases/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            }
        );
        setDiseases(diseases.filter((disease) => disease.id !== id));
      } catch (err) {
        alert("Erreur lors de la suppression !");
      }
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Gestion des Maladies</h1>

      <button onClick={() => setShowForm(true)} className="bg-green-500 text-white px-4 py-2 mb-4 rounded">
        Ajouter une Maladie
      </button>

      {showForm && <DiseaseForm onSuccess={() => { fetchDiseases(); setShowForm(false); }} />}

      {editingDisease && <DiseaseForm disease={editingDisease} onSuccess={() => { fetchDiseases(); setEditingDisease(null); }} />}

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nom</th>
            <th className="border p-2">Symptômes</th>
            <th className="border p-2">Traitement</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {diseases.map((disease) => (
            <tr key={disease.id}>
              <td className="border p-2">{disease.name}</td>
              <td className="border p-2">{disease.symptoms}</td>
              <td className="border p-2">{disease.treatment}</td>
              <td className="border p-2 flex space-x-2">
                <button onClick={() => setEditingDisease(disease)} className="text-blue-500">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(disease.id)} className="text-red-500">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
