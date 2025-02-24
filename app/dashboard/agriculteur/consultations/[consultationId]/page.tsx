'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type Message = {
  id: string;
  message: string;
  sender_type: 'farmer' | 'expert';
};

const ConsultationPage = ({ params }: { params: { consultationId: string } }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Récupérer les messages de la consultation
    const fetchMessages = async () => {
      try {

        const token = localStorage.getItem('auth_token');
        const res = await axios.get(`http://localhost:8000/api/consultations/${params.consultationId}/messages`,
            {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            }
        );
        setMessages(res.data);
        console.log(res.data.message)
      } catch (error) {
        console.error('Erreur lors de la récupération des messages', error);
      }
    };
    fetchMessages();
  }, [params.consultationId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.error('Pas de token trouvé');
      return;
    }

    try {
      // Envoi du message avec axios
      const response = await axios.post(
        `http://localhost:8000/api/consultations/${params.consultationId}/messages`,
        { message }, // On envoie le message dans le corps de la requête
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      // Ajouter le message envoyé à la liste des messages
      setMessages((prevMessages) => [...prevMessages, response.data]);

      // Réinitialiser le champ de message
      setMessage('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message', error);
    }
  };

  return (
    <div className="flex flex-col min-h-[90px] dark:bg-gray-900 p-4">
    <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
      💬 Consultation
    </h1>

    <div className="flex flex-col flex-grow overflow-y-auto space-y-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        Messages
      </h2>
      <ul className="space-y-2">
        {messages.map((msg) => (
          <li
            key={msg.id}
            className={`p-3 rounded-lg max-w-[50%] ${
              msg.sender_type === 'farmer'
                ? 'bg-green-400 text-white self-start ml-auto'
                : 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white self-end '
            }`}
          >
            <strong className="block text-sm">
              {msg.sender_type === 'farmer' ? '👨‍🌾 Agriculteur' : '🧑‍🏫 Expert'}
            </strong>
            {msg.message}
          </li>
        ))}
      </ul>
    </div>

    <form
      onSubmit={handleSendMessage}
      className="flex items-center mt-4 bg-white dark:bg-gray-800 p-3 shadow-md rounded-lg"
    >
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="💬 Tapez votre message..."
        className="flex-grow p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />
      <button
        type="submit"
        className="ml-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-300"
      >
        ➤ Envoyer
      </button>
    </form>
  </div>
  );
};

export default ConsultationPage;