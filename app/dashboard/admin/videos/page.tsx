'use client'
import { useEffect, useState } from "react";

import { FaTrash, FaEdit } from "react-icons/fa";
import VideoForm from "@/components/dashboard/admin/video";
import axios from "axios";

type Video = {
  id: number;
  title: string;
  link: string;
  description: string;
};

export default function AdminVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const token = localStorage.getItem("auth_token");

    try {
      const response = await axios.get("http://localhost:8000/api/videos",
        {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        }
      );
      setVideos(response.data.videos.data);
    } catch (err) {
      setError("Erreur lors du chargement des vidéos.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer cette vidéo ?")) {
        const token = localStorage.getItem("auth_token");

      try {
        await axios.delete(`http://localhost:8000/api/videos/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            }
        );
        setVideos(videos.filter((video) => video.id !== id));
      } catch (err) {
        alert("Erreur lors de la suppression !");
      }
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Gestion des Vidéos</h1>

      <button onClick={() => setShowForm(true)} className="bg-green-500 text-white px-4 py-2 mb-4 rounded">
        Ajouter une Vidéo
      </button>

      {showForm && <VideoForm onSuccess={() => { fetchVideos(); setShowForm(false); }} />}

      {editingVideo && <VideoForm video={editingVideo} onSuccess={() => { fetchVideos(); setEditingVideo(null); }} />}

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Titre</th>
            <th className="border p-2">Vidéo</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td className="border p-2">{video.title}</td>
              <td className="border p-2">
                <a href={video.link} target="_blank" className="text-blue-500">
                  Voir la vidéo
                </a>
              </td>
              <td className="border p-2 flex space-x-2">
                <button onClick={() => setEditingVideo(video)} className="text-blue-500">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(video.id)} className="text-red-500">
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
