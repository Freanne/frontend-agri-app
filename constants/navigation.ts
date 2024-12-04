import { BsGridFill } from "react-icons/bs"
import { BsCalendarEventFill } from "react-icons/bs"
import { BsCreditCard2BackFill } from "react-icons/bs"
import { BsFillPersonFill } from "react-icons/bs"
import { BsFillQuestionCircleFill } from "react-icons/bs"
import { BsGearFill } from "react-icons/bs"
export const navigation = [
    { name: "Les étapes de production", href: "/production", available: true },
    { name: "Créer un plan de culture", href: "/create-plan", available: false },
    { name: "Faire un diagnostic", href: "/diagnostic", available: true },
    { name: "Les maladies", href: "/diagnosis", available: true },
  ]

  export const DashboardNavigation = [
    {
      href: "/",
      icon: BsGridFill,
      text: "Dashboard",
    },
    {
      href: "/dashboard-farmer/remboursement",
      icon: BsCreditCard2BackFill,
      text: "Mes étapes",
    },
    {
      href: "/dashboard-farmer/events",
      icon: BsCalendarEventFill,
      text: "Mon calendrier",
    },
    {
      href: "/dashboard-farmer/profile",
      icon: BsFillPersonFill,
      text: "Profil",
    },
    {
      href: "/dashboard-farmer/help",
      icon: BsFillQuestionCircleFill,
      text: "Centre d'aide",
      position: "bottom",
    },
    {
      href: "/dashboard-farmer/settings",
      icon: BsGearFill,
      text: "Paramètres",
      position: "bottom",
    },
  ]