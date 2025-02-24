// "use client";
// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// const FarmForm = () => {
//   const [farm, setFarm] = useState({
//     name: "",
//     location: "",
//     area: 0,
//   });
//   const router = useRouter()
//   const [message, setMessage] = useState("");
// //   const API_BASE_URL = "https://ton-api.com/api"; // Remplace par l'URL de ton API

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFarm({ ...farm, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("auth_token"); // récupère ton token
//       const response = await axios.post('http://localhost:8000/api/farms', farm, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       setMessage(`Ferme ${response.data.name} créée avec succès !`);
//       router.push('/dashboard/agriculteur/farm/list')
//     } catch (err) {
//       setMessage("Erreur lors de la création");
//     }
//   };

//   return (
//     <div>
//       <h2>Créer une nouvelle parcelle</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Nom" onChange={handleChange} required />
//         <input type="text" name="location" placeholder="Localisation" onChange={handleChange} required />
//         <input type="number" name="area" placeholder="Superficie (ha)" onChange={handleChange} required />
//         <button type="submit">Créer une nouvelle parcelle</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default FarmForm;

"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


const FarmForm = () => {
  const {user} = useAuth();
  const [farm, setFarm] = useState({
    farmer_id: user?.id || "",
    name: "",
    location: "",
    area: 0,
  });
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFarm({ ...farm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!farm.farmer_id) {
        setMessage("❌ Erreur : Identifiant de l'agriculteur manquant.");
        setLoading(false);
        return;
      }
      
    try {
      const token = localStorage.getItem("auth_token");
      const response = await axios.post("http://localhost:8000/api/farms", farm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials:true,
      });
      setMessage(`✅ Ferme "${response.data.name}" créée avec succès !`);
      setTimeout(() => router.push("/dashboard/agriculteur/farm/list"), 1500);
    } catch (err) {
      setMessage("❌ Erreur lors de la création de la ferme.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
        🌱 Créer une nouvelle parcelle
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom de la ferme</label>
          <input
            type="text"
            name="name"
            placeholder="Ex: Ferme du Soleil"
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Localisation</label>
          <input
            type="text"
            name="location"
            placeholder="Ex: Abomey-Calavi"
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Superficie (en hectares)</label>
          <input
            type="number"
            name="area"
            placeholder="Ex: 10"
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 text-white font-semibold rounded-lg ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Création en cours..." : "Créer une nouvelle parcelle"}
        </button>
      </form>

      {message && (
        <p className={`mt-4 p-2 text-center font-medium ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      <button
        onClick={() => router.push("/dashboard/agriculteur/farm/list")}
        className="mt-4 w-full p-2 text-center text-green-600 font-semibold border border-green-600 rounded-lg hover:bg-green-100"
      >
        ⬅️ Retour à la liste des fermes
      </button>
    </div>
  );
};

export default FarmForm;

