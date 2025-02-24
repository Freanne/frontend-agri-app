// 'use client'
// import { useState } from "react";
// import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from "date-fns";
// import fr from "date-fns/locale/fr";

// interface Task {
//   date: string;
//   title: string;
//   status: "done" | "in-progress" | "upcoming";
// }

// const tasks: Task[] = [
//   { date: "2025-02-10", title: "Planter du maïs", status: "upcoming" },
//   { date: "2025-02-14", title: "Arrosage des plants", status: "in-progress" },
//   { date: "2025-02-20", title: "Récolte du maïs", status: "done" },
// ];

// const Calendar = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const start = startOfMonth(currentDate);
//   const end = endOfMonth(currentDate);
//   const days = eachDayOfInterval({ start, end });

//   const getStatusColor = (status: Task["status"]) => {
//     return status === "done" ? "bg-green-500" : status === "in-progress" ? "bg-blue-500" : "bg-yellow-500";
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-5">
//       <h2 className="text-xl font-bold text-gray-800 text-center">
//         {format(currentDate, "MMMM yyyy", { locale: fr })}
//       </h2>

//       <div className="grid grid-cols-7 gap-2 mt-5">
//         {days.map((day) => {
//           const task = tasks.find((t) => t.date === format(day, "yyyy-MM-dd"));
//           return (
//             <div
//               key={day.toString()}
//               className={`relative flex flex-col items-center justify-center h-20 border rounded-md ${
//                 isToday(day) ? "border-blue-500" : "border-gray-300"
//               }`}
//             >
//               <span className="text-gray-800">{format(day, "d")}</span>
//               {task && (
//                 <span
//                   className={`absolute bottom-1 text-xs text-white px-2 py-1 rounded-full ${getStatusColor(task.status)}`}
//                 >
//                   {task.title}
//                 </span>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Calendar;

// 'use client'
// import { useState, useEffect } from "react";
// import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, addMonths, subMonths, differenceInDays } from "date-fns";
// import fr from "date-fns/locale/fr";

// interface Task {
//   date: string;
//   title: string;
//   status: "done" | "in-progress" | "upcoming";
//   description?: string;
// }

// const Calendar = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [tasks, setTasks] = useState<Task[]>([
//     { date: "2025-02-06", title: "Planter du maïs", status: "upcoming", description: "Préparer le sol et planter les graines." },
//     { date: "2025-02-08", title: "Arrosage des plants", status: "in-progress", description: "Arroser les cultures matin et soir." },
//     { date: "2025-02-10", title: "Récolte du maïs", status: "done", description: "Récolter les épis de maïs mûrs." },
//   ]);
//   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
//   const [newTask, setNewTask] = useState({ date: "", title: "", status: "upcoming" as Task["status"], description: "" });
//   const [alertTask, setAlertTask] = useState<Task | null>(null);
//   const [showAlert, setShowAlert] = useState(true);

//   useEffect(() => {
//     const today = new Date();
//     const upcomingTask = tasks.find((task) => differenceInDays(new Date(task.date), today) === 2);
//     if (upcomingTask) {
//       setAlertTask(upcomingTask);
//     } else {
//       setAlertTask(null);
//     }
//   }, [tasks]);

//   const changeMonth = (direction: "prev" | "next") => {
//     setCurrentDate(direction === "prev" ? subMonths(currentDate, 1) : addMonths(currentDate, 1));
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-5">
//       {/* ✅ Notification de tâche à venir */}
//       {alertTask && showAlert && (
//         <div className="mb-4 p-3 bg-yellow-200 border-l-4 border-yellow-500 text-yellow-800 flex justify-between">
//           <p>
//             🔔 **Rappel** : La tâche <strong>{alertTask.title}</strong> est prévue pour <strong>{alertTask.date}</strong>.
//           </p>
//           <button onClick={() => setShowAlert(false)} className="text-red-600 font-bold">X</button>
//         </div>
//       )}

//       {/* Navigation entre les mois */}
//       <div className="flex justify-between items-center mb-5">
//         <button onClick={() => changeMonth("prev")} className="px-4 py-2 bg-gray-200 rounded-md">⬅️ Précédent</button>
//         <h2 className="text-xl font-bold text-gray-800 text-center">
//           {format(currentDate, "MMMM yyyy", { locale: fr })}
//         </h2>
//         <button onClick={() => changeMonth("next")} className="px-4 py-2 bg-gray-200 rounded-md">Suivant ➡️</button>
//       </div>

//       {/* 🗓️ Calendrier */}
//       <div className="grid grid-cols-7 gap-2">
//         {eachDayOfInterval({ start: startOfMonth(currentDate), end: endOfMonth(currentDate) }).map((day) => {
//           const task = tasks.find((t) => t.date === format(day, "yyyy-MM-dd"));
//           return (
//             <div key={day.toString()} className={`relative flex flex-col items-center justify-center h-20 border rounded-md cursor-pointer ${isToday(day) ? "border-blue-500" : "border-gray-300"}`}
//               onClick={() => task && setSelectedTask(task)}>
//               <span className="text-gray-800">{format(day, "d")}</span>
//               {task && (
//                 <span className={`absolute bottom-1 text-xs text-white px-2 py-1 rounded-full ${task.status === "done" ? "bg-green-500" : task.status === "in-progress" ? "bg-blue-500" : "bg-yellow-500"}`}>
//                   {task.title}
//                 </span>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* 📝 Modale des détails de la tâche */}
//       {selectedTask && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-5 rounded-lg shadow-lg w-96">
//             <h2 className="text-xl font-bold mb-3">{selectedTask.title}</h2>
//             <p className="text-gray-700 mb-2">📅 **Date** : {selectedTask.date}</p>
//             <p className="text-gray-700 mb-4">📝 **Description** : {selectedTask.description || "Aucune description"}</p>
//             <button onClick={() => setSelectedTask(null)} className="px-4 py-2 bg-red-500 text-white rounded-md">Fermer</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Calendar;

'use client'
import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, addMonths, subMonths, differenceInDays } from "date-fns";
import fr from "date-fns/locale/fr";

interface Task {
  date: string;
  title: string;
  status: "done" | "in-progress" | "upcoming";
  description?: string;
}

const notificationSound = new Audio("/notification.mp3"); // Son de notification

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([
    { date: "2025-02-06", title: "Planter du maïs", status: "upcoming", description: "Préparer le sol et planter les graines." },
    { date: "2025-02-08", title: "Arrosage des plants", status: "in-progress", description: "Arroser les cultures matin et soir." },
    { date: "2025-02-10", title: "Récolte du maïs", status: "done", description: "Récolter les épis de maïs mûrs." },
  ]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [alertTask, setAlertTask] = useState<Task | null>(null);
  const [showAlert, setShowAlert] = useState(true);

  // Vérifier les tâches à venir (notamment celles dans 2 jours) et jouer la notification sonore
  useEffect(() => {
    const today = new Date();
    const upcomingTask = tasks.find((task) => differenceInDays(new Date(task.date), today) === 2);
    
    if (upcomingTask) {
      setAlertTask(upcomingTask);
      notificationSound.play(); // Jouer le son de notification
    } else {
      setAlertTask(null);
    }
  }, [tasks]);

  // Fonction pour naviguer entre les mois
  const changeMonth = (direction: "prev" | "next") => {
    setCurrentDate(direction === "prev" ? subMonths(currentDate, 1) : addMonths(currentDate, 1));
  };

  // Fonction pour marquer une tâche comme terminée
  const markTaskAsDone = (task: Task) => {
    setTasks((prevTasks) => prevTasks.map(t => t.date === task.date ? { ...t, status: "done" } : t));
    setSelectedTask(null);
  };

  return (
    <div className="w-full m-4 lg:max-w-6xl lg:mx-auto bg-white shadow-lg rounded-lg p-5">
      {/* Notification de tâche à venir */}
      {alertTask && showAlert && (
        <div className="mb-4 p-3 bg-yellow-200 border-l-4 border-yellow-500 text-yellow-800 flex justify-between">
          <p>
            🔔 **Rappel** : La tâche <strong>{alertTask.title}</strong> est prévue pour le <strong>{alertTask.date}</strong>.
          </p>
          <button onClick={() => setShowAlert(false)} className="text-red-600 font-bold">X</button>
        </div>
      )}

      {/* Navigation entre les mois */}
      <div className="flex justify-between items-center mb-5">
        <button onClick={() => changeMonth("prev")} className="px-4 py-2 bg-gray-200 rounded-md">⬅️ Précédent</button>
        <h2 className="text-xl font-bold text-gray-800 text-center">
          {format(currentDate, "MMMM yyyy", { locale: fr })}
        </h2>
        <button onClick={() => changeMonth("next")} className="px-4 py-2 bg-gray-200 rounded-md">Suivant ➡️</button>
      </div>

      {/* Calendrier */}
      <div className="grid grid-cols-7 gap-2">
        {eachDayOfInterval({ start: startOfMonth(currentDate), end: endOfMonth(currentDate) }).map((day) => {
          const task = tasks.find((t) => t.date === format(day, "yyyy-MM-dd"));
          return (
            <div key={day.toString()} className={`relative flex flex-col items-center justify-center h-20 border rounded-md cursor-pointer ${isToday(day) ? "border-blue-500" : "border-gray-300"}`}
              onClick={() => task && setSelectedTask(task)}>
              <span className="text-gray-800">{format(day, "d")}</span>
              {task && (
                <span className={`absolute bottom-1 text-xs text-white px-2 py-1 rounded-full ${
                  task.status === "done" ? "bg-green-500" : 
                  task.status === "in-progress" ? "bg-blue-500" : "bg-yellow-500"
                }`}>
                  {task.title}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Modale des détails d'une tâche */}
      {selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold">{selectedTask.title}</h3>
            <p className="text-gray-600 mt-2">{selectedTask.description}</p>
            <p className="mt-2">
              📅 <strong>Date :</strong> {selectedTask.date}
            </p>
            <p className="mt-2">
              🏷️ <strong>Statut :</strong> <span className={`px-2 py-1 text-white rounded ${
                selectedTask.status === "done" ? "bg-green-500" : 
                selectedTask.status === "in-progress" ? "bg-blue-500" : "bg-yellow-500"
              }`}>
                {selectedTask.status === "done" ? "Terminé" : selectedTask.status === "in-progress" ? "En cours" : "À venir"}
              </span>
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              {selectedTask.status !== "done" && (
                <button
                  onClick={() => markTaskAsDone(selectedTask)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  ✅ Terminer
                </button>
              )}
              <button
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                ❌ Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
