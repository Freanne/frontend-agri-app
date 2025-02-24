"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface Message {
  id: number;
  sender: "farmer" | "expert";
  text: string;
}

const MessageComponent = ({ message }: { message: Message }) => {
  return (
    <div
      className={`p-2 rounded-lg max-w-xs ${
        message.sender === "farmer" ? "bg-green-200 self-end" : "bg-blue-200 self-start"
      }`}
    >
      {message.text}
    </div>
  );
};

const Chat = () => {
  const searchParams = useSearchParams();
  const expertId = searchParams.get("expertId"); // Récupère l'expertId depuis l'URL

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [formData, setFormData] = useState({
    // consultation_type: '',
    details: '',
    // date: '',
  });
  const userId = 1; // ID du fermier, remplace par l'ID réel de l'utilisateur connecté

  // Récupérer les messages à chaque fois que l'expertId change
  useEffect(() => {
    if (!expertId) return; // Si l'expertId n'est pas encore disponible

    const fetchMessages = async () => {
      try {
        const response = await axios.get<Message[]>(`http://127.0.0.1:8000/api/messages/${expertId}`, {
          withCredentials:true
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des messages", error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Actualisation toutes les 5 secondes
    return () => clearInterval(interval);
  }, [expertId]);

  // Fonction d'envoi de message

  const handleSubmit = async (e: ) => {
    event.preventDefault();

    try {
      const response = await axios.post( "http://127.0.0.1:8000/api/consultations",
        {expert_id: expertId,
        ...formData,
        },
        {withCredentials:true}
      );
      
      console.log('Demande de consultation envoyée', response);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la demande', error);
    }
  };

  // const sendMessage = async () => {
  //   if (!newMessage.trim()) return;

  //   try {
  //     const response = await axios.post<Message>(
  //       "http://127.0.0.1:8000/api/consultations",
  //       {expert_id: expertId,
  //       ...formData,
  //       },
  //       {withCredentials:true}
  //     );

  //     setMessages((prev) => [...prev, response.data]); // Ajouter le nouveau message
  //     setNewMessage(""); // Réinitialiser le champ de saisie
  //   } catch (error) {
  //     console.error("Erreur lors de l'envoi du message", error);
  //   }
  // };

  return (
    <div className="flex lg:w-full lg:max-w-7xl m-4 lg:mx-auto p-4 border rounded-lg shadow-lg bg-white">
      Zone de chat
      <div className="flex flex-col w-full p-4">
        <div className="h-80 overflow-y-auto p-2 flex flex-col space-y-2">
          {messages.map((msg) => (
            <MessageComponent key={msg.id} message={msg} />
          ))}
        </div>

       
        <div className="flex items-center mt-4 border-t pt-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez un message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
