'use client'
          import { useState, useEffect } from 'react';
          import { useRouter } from 'next/navigation';
          import axios from 'axios';
          import ExpertsList from './ExpertList';
          import { HiOutlineMail } from 'react-icons/hi'; // Icône de mail
import { useAuth } from '@/context/AuthContext';
          
          interface Message {
            id: number;
            sender_id: number;
            receiver_id: number;
            message: string;
            is_read: boolean;
          }
          
          interface Expert {
            id: number;
            name: string;
            speciality: string;
            experience: string;
            availability: string;
            user: {
              id:number;
              first_name: string;
              last_name: string;
              email: string;
              phone: string;
            };
          }
          
          export default function MessagingApp() {
            const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
            const [messages, setMessages] = useState<Message[]>([]);
            const [messageText, setMessageText] = useState<string>('');
            const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
            const [error, setError] = useState<string | null>(null);
            const router = useRouter();
            const { user } = useAuth()
            const [formData, setFormData] = useState({
              details: '', // Contient le message de l'agriculteur
            });
          
            // Sélectionner un expert
            const handleSelectExpert = (expert: Expert | null) => {
              setSelectedExpert(expert);
              setMessages([]);
              setError(null);
            };
          
            // Charger les messages lorsqu'un expert est sélectionné
            useEffect(() => {
              if (selectedExpert) {
                const fetchMessages = async () => {

                  const token = localStorage.getItem('auth_token');
                  console.log()
                  try {
                    const response = await axios.get(`http://localhost:8000/api/experts/${selectedExpert.user?.id}`,
                      {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true,
                    });

 

                  } catch (error) {
                    setError('Erreur lors de la récupération des messages');

                  }
                };
                fetchMessages();
              }
            }, [selectedExpert]);
          
            // Soumettre la demande de consultation
            const handleSubmit = async (e: React.FormEvent) => {
              e.preventDefault();
              const token = localStorage.getItem('auth_token');
              // console.log(token)
              console.log('tout va bien')

              try {
                const response = await axios.post('http://localhost:8000/api/consultations', {
                  expert_id: selectedExpert?.id,
                  message: formData.details,
                  farmer_id: user?.id, // ID de l'agriculteur
                   // Utilisation des détails comme message
                },
                {
                  headers: { Authorization: `Bearer ${token}` },
                  withCredentials: true,
                });
               
                // setMessages((prevMessages) => [
                //   ...prevMessages,
                //   response.data.data, // Ajouter la consultation envoyée
                // ]);
                // setMessageText('');
                const consultationId = response.data.consultation.id
                // router.push('/dashboard/agriculteur/events')
                router.push(`/dashboard/agriculteur/consultations/${consultationId}`)
              } catch (error) {
                setError('Erreur lors de l\'envoi du message');
              }
            };
          
            return (
              <div className="max-w-7xl mx-auto px-4 py-6">
                <h1 className="text-2xl font-semibold text-center mb-6">Faites vos demandes de consultations</h1>
          
                <div className="grid grid-cols-3 gap-8">
                  {/* Liste des experts à gauche */}
                  <div className="col-span-1">
                    <ExpertsList onSelectExpert={handleSelectExpert} />
                  </div>
          
                  {/* Section de messagerie à droite */}
                  {selectedExpert && (
                    <div className="col-span-2 my-10">
                      <h1 className="text-2xl font-bold">Effectuer une demande de consultation avec {selectedExpert.user.first_name}</h1>
                      <form onSubmit={handleSubmit} className="mt-4">
                        <div className="mb-4">
                          {/* <label htmlFor="details" className="block">Détails de la demande</label> */}
                          <textarea
                            id="details"
                            name="details"
                            placeholder='Renseignez les détails de la demande'
                            value={formData.details}
                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                   
                            className="w-full p-2 border border-gray-300 rounded-lg resize-none h-36"
                          />
                        </div>
          
                        <button type="submit" className="bg-green-500 text-white p-2 rounded flex ml-auto">Envoyer la demande</button>
                      </form>
                    </div>
                  )}
          
                  {!selectedExpert && <p className="text-center text-gray-500">Veuillez sélectionner un expert pour démarrer la conversation.</p>}
                </div>
              </div>
            );
          }
          