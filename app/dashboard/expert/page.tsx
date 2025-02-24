// 'use client'
// import ExpertDashboard from '@/components/dashboard-expert/expert'
// import FarmerList from '@/components/dashboard/expert/FarmerLIst'
// import React, { useState } from 'react'

// type Farmer = {
//   id: number,
//   last_name: string,
//   first_name: string,
//   phone: string,
//   ifu: string,
//   email: string,
//   email_verified_at: string | null,
//   user_type: string,
//   created_at: string,
//   updated_at: string,
// };

// const Expert = () => {
//   const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);  
//   const handleSelectFarmer = (expert: Farmer | null) => {
//     setSelectedFarmer(expert);
//     // setMessages([]);
//     // setError(null);
//   };
//   return (
//     <div>

//         <FarmerList onSelectFarmers={handleSelectFarmer} />
//     </div>
//   )
// }

// export default Expert



'use client'

import React from 'react';
// import { Card, CardContent } from '@/components/ui/card';
import { FaSeedling, FaClipboardList, FaDiagnoses, FaCalendarAlt } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DashboardExpert = () => {
  const stats = [
    { id: 1, title: 'Parcelles', value: 10, icon: <FaSeedling size={28} /> },
    // { id: 2, title: 'Plans de culture', value: 5, icon: <FaClipboardList size={28} /> },
    { id: 3, title: 'Consultations étudiées', value: 3, icon: <FaCalendarAlt size={28} /> },
    { id: 4, title: 'Diagnostics étudiés', value: 7, icon: <FaDiagnoses size={28} /> },
  ];

  const data = [
    { name: 'Jan', consultations: 2, diagnostics: 3 },
    { name: 'Fév', consultations: 1, diagnostics: 4 },
    { name: 'Mar', consultations: 4, diagnostics: 2 },
    { name: 'Avr', consultations: 3, diagnostics: 5 },
  ];

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Dashboard Expert</h1>
      
      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {stats.map(stat => (
          <div key={stat.id} className='p-4 flex items-center shadow-lg'>
            <div className='text-green-700 mr-4'>{stat.icon}</div>
            <div>
              <p className='text-lg font-semibold'>{stat.title}</p>
              <p className='text-2xl font-bold'>{stat.value}</p>
            </div>
          </div>
        ))}
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

export default DashboardExpert;