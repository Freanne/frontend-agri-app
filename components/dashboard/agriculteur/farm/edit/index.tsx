"use client";
import { useState } from "react";
import axios from "axios";

interface EditFarmProps {
  farm: { id: number; name: string; location: string; area: number };
}

const EditFarmForm = ({ farm }: EditFarmProps) => {
  const [formData, setFormData] = useState(farm);
  const [message, setMessage] = useState("");
  // Remplace par l'URL de ton API

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("auth_token"); // récupère ton token
      const response = await axios.put(`http://localhost:8000/api/farms/${formData.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials:true,
      });
      setMessage("Ferme mise à jour !");
    } catch (err) {
      setMessage("Erreur de mise à jour");
    }
  };

  return (
    <div>
      <h2>Modifier la ferme</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        <input type="number" name="area" value={formData.area} onChange={handleChange} required />
        <button type="submit">Modifier</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditFarmForm;
