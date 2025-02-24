// 'use client'
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Calendar, momentLocalizer, Event, Views, View } from "react-big-calendar"; // Importez `View` pour le type
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import moment from "moment";
// import "moment/locale/fr"; 
// import { useParams } from "next/navigation";

// moment.locale("fr");
// const localizer = momentLocalizer(moment);

// interface Task {
//   id: number;
//   task_type: string;
//   task_date: string;
//   status: string;
// }

// const TasksCalendar = () => {
//   const { id } = useParams();
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [view, setView] = useState<View>(Views.MONTH); // Utilisez `View` ici
//   const [date, setDate] = useState(new Date()); // Ajoutez un état pour gérer la date courante

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = localStorage.getItem("auth_token");
//         const response = await axios.get(
//           `http://localhost:8000/api/cultivation-plans/${id}/tasks`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true,
//           }
//         );
//         setTasks(response.data);
//       } catch (error) {
//         setError("Impossible de récupérer les tâches.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchTasks();
//   }, [id]);

//   if (loading) return <p>Chargement du calendrier...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   const events: Event[] = tasks
//     .map((task) => {
//       const date = moment(task.task_date, "YYYY-MM-DD", true);

//       if (!date.isValid()) {
//         console.error(`Date invalide pour la tâche ${task.id}:`, task.task_date);
//         return null;
//       }

//       return {
//         title: `${task.task_type} (${task.status})`,
//         start: date.toDate(),
//         end: date.toDate(),
//         allDay: true,
//       } as Event;
//     })
//     .filter((event): event is Event => event !== null);

//   // Fonction pour gérer la navigation entre les mois
//   const handleNavigate = (date: Date, view: View) => { // Mettez à jour le type de `view`
//     setDate(date); // Met à jour la date courante lors de la navigation
//     setView(view); // Met à jour la vue sélectionnée
//     console.log(`Naviguer vers: ${date}, Vue: ${view}`);
//   };

//   return (
//     <div className="container mx-auto py-4">
//       <h1 className="text-2xl font-bold mb-4">Calendrier des tâches</h1>
//       <div style={{ height: 600 }}>
//         <Calendar
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           style={{ height: "100%" }}
//           view={view} 
//           defaultView={view}
//           onNavigate={handleNavigate} // Utilise la fonction handleNavigate pour la navigation
//           views={[Views.MONTH, Views.WEEK, Views.DAY]} // Active les vues par mois, semaine et jour
//           date={date} // Passe la date courante à la propriété 'date' du calendrier
//           onView={setView} // Permet de changer la vue
//         />
//       </div>
//     </div>
//   );
// };

// export default TasksCalendar;






// 'use client'
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Calendar, momentLocalizer, Event, Views, View } from "react-big-calendar";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import moment from "moment";
// import "moment/locale/fr";
// import { useParams } from "next/navigation";

// moment.locale("fr");
// const localizer = momentLocalizer(moment);

// interface Task {
//   id: number;
//   task_type: string;
//   task_date: string;
//   status: string;
// }

// interface CustomEvent {
//   title: string;
//   start: Date;
//   end: Date;
//   allDay?: boolean;
//   style?: object;
// }


// const TasksCalendar = () => {
//   const { id } = useParams();
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [view, setView] = useState<View>(Views.MONTH);
//   const [date, setDate] = useState(new Date());
//   const [selectedTask, setSelectedTask] = useState<Task | null>(null); // State pour la tâche sélectionnée

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = localStorage.getItem("auth_token");
//         const response = await axios.get(
//           `http://localhost:8000/api/cultivation-plans/${id}/tasks`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true,
//           }
//         );
//         setTasks(response.data);
//       } catch (error) {
//         setError("Impossible de récupérer les tâches.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchTasks();
//   }, [id]);

//   if (loading) return (<div className="flex justify-center items-center h-40">
//   <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-500"></div>
// </div>);
//   if (error) return <p className="text-red-500">{error}</p>;

//   const handleSelectEvent = (event: CustomEvent) => {
//     console.log("Événement sélectionné:", event);  // Ajout du log ici
//     if (!event.start) return;
//     const task = tasks.find(t => t.task_date === event.start.toLocaleDateString() && t.task_type === event.title);
//     setSelectedTask(task || null);
//   };
//   const handleStatusChange = (newStatus: string) => {
//     if (!selectedTask) return;

//     const updatedTask = { ...selectedTask, status: newStatus };
//     setTasks(prevTasks => prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));

//     // Mise à jour de la tâche dans le backend
//     axios.put(
//       `http://localhost:8000/api/tasks/${updatedTask.id}/tasks`,
//       { status: newStatus },
//       {
//         headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
//         withCredentials: true,
//       }
//     ).catch(() => setError("Impossible de mettre à jour le statut."));
//   };

//   const handleDeleteEvent = () => {
//     if (!selectedTask || selectedTask.status !== "Terminé") return;

//     // Supprimer l'événement du calendrier
//     setTasks(prevTasks => prevTasks.filter(task => task.id !== selectedTask.id));

//     // Supprimer la tâche du backend
//     axios.delete(
//       `http://localhost:8000/api/tasks/${selectedTask.id}`,
//       {
//         headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
//         withCredentials: true,
//       }
//     ).catch(() => setError("Impossible de supprimer la tâche."));
    
//     setSelectedTask(null);
//   };

//   // const events: Event[] = tasks
//   //   .map((task) => {
//   //     const date = moment(task.task_date, "YYYY-MM-DD", true);

//   //     if (!date.isValid()) {
//   //       console.error(`Date invalide pour la tâche ${task.id}:`, task.task_date);
//   //       return null;
//   //     }

//   //     const backgroundColor = task.status === "Non commencé" ? "red" : task.status === "En cours" ? "yellow" : "green";

//   //     return {
//   //       title: `${task.task_type} (${task.status})`,
//   //       start: date.toDate(),
//   //       end: date.toDate(),
//   //       allDay: true,
//   //       style: { backgroundColor },
//   //     } as Event;
//   //   })
//   //   .filter((event): event is Event => event !== null);


//   const events: CustomEvent[] = tasks
//   .map((task) => {
//     const date = moment(task.task_date, "YYYY-MM-DD", true);

//     if (!date.isValid()) {
//       console.error(`Date invalide pour la tâche ${task.id}:`, task.task_date);
//       return null;
//     }

//     const backgroundColor = task.status === "pending" ? "red" : task.status === "in progress" ? "yellow" : "green";

//     return {
//       title: `${task.task_type} (${task.status})`,
//       start: date.toDate(),
//       end: date.toDate(),
//       allDay: true,
//       style: { backgroundColor },
//     } as CustomEvent;
//   })
//   .filter((event): event is CustomEvent => event !== null);

//   const handleNavigate = (date: Date, view: View) => {
//     setDate(date);
//     setView(view);
//   };

//   return (
//     <div className="lg:max-w-7xl lg:mx-auto py-4 mx-4">
//       <h1 className="text-2xl font-bold mb-4">Calendrier des tâches</h1>
//       <div style={{ height: 600 }}>
//         <Calendar
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           style={{ height: "100%" }}
//           view={view}
//           defaultView={view}
//           onNavigate={handleNavigate}
//           views={[Views.MONTH, Views.WEEK, Views.DAY]}
//           date={date}
//           onView={setView}
//           onSelectEvent={handleSelectEvent} // Clic sur l'événement pour afficher les détails
//         />
//       </div>

//       {selectedTask && (
//         <div className="mt-4 p-4 border border-gray-300 rounded">
//           <h2 className="text-xl font-semibold">Détails de la tâche</h2>
//           <p><strong>Type de tâche:</strong> {selectedTask.task_type}</p>
//           <p><strong>Date:</strong> {selectedTask.task_date}</p>
//           <p><strong>Statut:</strong> {selectedTask.status}</p>

//           <div className="mt-2">
//             <button
//               className="bg-blue-500 text-white p-2 rounded"
//               onClick={() => handleStatusChange("En cours")}
//             >
//               Marquer comme "En cours"
//             </button>
//             <button
//               className="bg-green-500 text-white p-2 rounded ml-2"
//               onClick={() => handleStatusChange("Terminé")}
//             >
//               Marquer comme "Terminé"
//             </button>
//             <button
//               className="bg-red-500 text-white p-2 rounded ml-2"
//               onClick={handleDeleteEvent}
//               disabled={selectedTask.status !== "Terminé"}
//             >
//               Supprimer la tâche
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TasksCalendar;




'use client'
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useParams } from "next/navigation";
import axios from "axios";
import { Calendar, momentLocalizer, Event, Views, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");
const localizer = momentLocalizer(moment);

interface Task {
  id: number;
  task_type: string;
  task_date: string;
  status: string;
}

interface CustomEvent {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  style?: object;
}

const TasksCalendar = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State pour contrôler l'ouverture du modal
  const [alert, setAlert] = useState<string | null>(null);
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await axios.get(
        `http://localhost:8000/api/cultivation-plans/${id}/tasks`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setTasks(response.data);
    } catch (error) {
      setError("Impossible de récupérer les tâches.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchTasks();
  }, [id]);

  const handleSelectEvent = (event: CustomEvent) => {
    if (!event.start) return;
    const task = tasks.find(t => t.task_date === event.start.toLocaleDateString() && t.task_type === event.title);

    if (task) {
      console.log("Tâche sélectionnée:", task); // Vérifiez que la tâche est bien trouvée
    }
    else {
      console.log("Tâche non sélectionnée:");
    }

    setSelectedTask(task || null);
    setIsModalOpen(true); // Ouvrir le modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Fermer le modal
  };

  const handleStatusChange = (newStatus: string) => {
    if (!selectedTask) return;

    const updatedTask = { ...selectedTask, status: newStatus };
    setTasks(prevTasks => prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));

    axios.put(
      `http://localhost:8000/api/tasks/${updatedTask.id}/tasks`,
      { status: newStatus },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
        withCredentials: true,
      }
    ).catch(() => setError("Impossible de mettre à jour le statut."));
  };

  const handleDeleteEvent = () => {
    if (!selectedTask || selectedTask.status !== "Terminé") return;

    setTasks(prevTasks => prevTasks.filter(task => task.id !== selectedTask.id));

    axios.delete(
      `http://localhost:8000/api/tasks/${selectedTask.id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
        withCredentials: true,
      }
    ).catch(() => setError("Impossible de supprimer la tâche."));
    
    setSelectedTask(null);
    closeModal(); // Fermer le modal après suppression
  };

  const events: CustomEvent[] = tasks
    .map((task) => {
      const date = moment(task.task_date, "YYYY-MM-DD", true);

      if (!date.isValid()) {
        console.error(`Date invalide pour la tâche ${task.id}:`, task.task_date);
        return null;
      }

      const backgroundColor = task.status === "pending" ? "red" : task.status === "in progress" ? "yellow" : "green";

      return {
        title: `${task.task_type} (${task.status})`,
        start: date.toDate(),
        end: date.toDate(),
        allDay: true,
        style: { backgroundColor },
      } as CustomEvent;
    })
    .filter((event): event is CustomEvent => event !== null);

  const handleNavigate = (date: Date, view: View) => {
    setDate(date);
    setView(view);
  };

  useEffect(() => {
    // Si la liste des tâches a été récupérée
    if (tasks.length > 0) {
      const today = moment(); // Date actuelle
      const threeDaysAhead = moment().add(3, "days"); // Date dans 3 jours
  
      // Vérifier si une tâche est dans les 3 jours à venir
      tasks.forEach(task => {
        const taskDate = moment(task.task_date, "YYYY-MM-DD");
  
        // Si l'événement est dans les 3 jours à venir
        if (taskDate.isBetween(today, threeDaysAhead, undefined, "[]")) {
          setAlert(`L'événement "${task.task_type}" aura lieu dans 3 jours !`);
        }
      });
    }
  }, [tasks]);
  return (
    <div className="lg:max-w-7xl lg:mx-auto py-4 mx-4">
      <h1 className="text-2xl font-bold mb-4">Calendrier des tâches</h1>

      {alert && (
      <div className="bg-yellow-400 text-black p-4 rounded-lg mb-4">
        <strong>Attention!</strong> {alert}
      </div>
    )}

      <div style={{ height: 600 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          view={view}
          defaultView={view}
          onNavigate={handleNavigate}
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          date={date}
          onView={setView}
          onSelectEvent={handleSelectEvent} // Clic sur l'événement pour afficher les détails
        />
      </div>

      {/* Modal pour afficher les détails de la tâche */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Détails de la tâche" className="modal" overlayClassName="overlay">
        <div className="modal-content">
          <h2 className="text-xl font-semibold">Détails de la tâche</h2>
          {selectedTask ? (
      <>
        <p><strong>Type de tâche:</strong> {selectedTask.task_type}</p>
        <p><strong>Date:</strong> {selectedTask.task_date}</p>
        <p><strong>Statut:</strong> {selectedTask.status}</p>

        <div className="mt-2">
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => handleStatusChange("En cours")}
          >
            Marquer comme "En cours"
          </button>
          <button
            className="bg-green-500 text-white p-2 rounded ml-2"
            onClick={() => handleStatusChange("Terminé")}
          >
            Marquer comme "Terminé"
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded ml-2"
            onClick={handleDeleteEvent}
            disabled={selectedTask.status !== "Terminé"}
          >
            Supprimer la tâche
          </button>
        </div>
      </>
    ) : (
      <p className="text-red-500 text-base my-8">La tâche n'est pas encore disponible.
        Revenez le jour J.
      </p> // Message si aucune tâche n'est sélectionnée
    )}
          
          <button onClick={closeModal} className="mt-4 text-black bg-green-500 py-2 px-4 rounded-lg">Fermer</button>
        </div>
      </Modal>
    </div>
  );
};

export default TasksCalendar;
