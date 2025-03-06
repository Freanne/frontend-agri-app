// import Dashboard from '@/components/dashboard/agriculteur/dashboard'
// import React from 'react'

// const Agriculteur = () => {
//   return (
//     <div>
//         <Dashboard/>
//     </div>
//   )
// }

// export default Agriculteur

'use client'

import React, { useEffect, useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
import { FaSeedling, FaClipboardList, FaDiagnoses, FaCalendarAlt } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DashboardAgriculteur = () => {
  const [farmCount, setFarmCount] = useState<number | null>(null)
  const [planCount, setPlanCount] = useState<number | null>(null)
  const [farms, setFarms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const stats = [
    { id: 1, title: 'Parcelles', value: 10, icon: <FaSeedling size={28} /> },
    { id: 2, title: 'Plans de culture', value: 5, icon: <FaClipboardList size={28} /> },
    { id: 3, title: 'Consultations', value: 3, icon: <FaCalendarAlt size={28} /> },
    { id: 4, title: 'Diagnostics', value: 7, icon: <FaDiagnoses size={28} /> },
  ];

  const data = [
    { name: 'Jan', consultations: 2, diagnostics: 3 },
    { name: 'Fév', consultations: 1, diagnostics: 4 },
    { name: 'Mar', consultations: 4, diagnostics: 2 },
    { name: 'Avr', consultations: 3, diagnostics: 5 },
  ];


  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get("http://localhost:8000/api/farms", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setFarmCount(response.data.length);

        const farmsWithPlans = await Promise.all(
          response.data.map(async (farm: any) => {
            try {
              const planResponse = await axios.get(`http://localhost:8000/api/cultivation-plans/${farm.id}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              });
              setPlanCount(planResponse.data.length);
              console.log(setPlanCount)
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

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
      
      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {/* {stats.map(stat => ( */}
          <div className='p-4 flex items-center shadow-lg'>
            <div className='text-green-700 mr-4'><FaSeedling size={28}/></div>
            <div>
              <p className='text-lg font-semibold'>Parcelles</p>
              <p className='text-2xl font-bold'>{farmCount}</p>
            </div>
          </div>

          <div className='p-4 flex items-center shadow-lg'>
            <div className='text-green-700 mr-4'><FaClipboardList size={28} /></div>
            <div>
              <p className='text-lg font-semibold'>Plan de culture</p>
              <p className='text-2xl font-bold'>{planCount}</p>
            </div>
          </div>
        {/* ))} */}
      </div>

      {/* Graphique */}
      <div className='mt-8 bg-white p-4 shadow-lg rounded-lg'>
        <h2 className='text-lg font-semibold mb-2'>Évolution des consultations et diagnostics</h2>
        <ResponsiveContainer width='100%' height={250}>
          <LineChart data={data}>
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Line type='monotone' dataKey='consultations' stroke='#82ca9d' />
            <Line type='monotone' dataKey='diagnostics' stroke='#8884d8' />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Calendrier & Activités */}
      <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='p-4 shadow-lg'>
          <h2 className='text-lg font-semibold mb-2'>Calendrier</h2>
          <Calendar />
        </div>
        <div className='p-4 shadow-lg'>
          <h2 className='text-lg font-semibold mb-2'>Historique des activités</h2>
          <ul>
            <li>✅ Nouvelle parcelle ajoutée</li>
            <li>✅ Consultation demandée</li>
            <li>✅ Diagnostic effectué</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardAgriculteur;
