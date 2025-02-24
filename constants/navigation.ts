import { BsGridFill } from "react-icons/bs"
import { BsCalendarEventFill } from "react-icons/bs"
import { BsCreditCard2BackFill } from "react-icons/bs"
import { BsFillPersonFill } from "react-icons/bs"
import { BsFillQuestionCircleFill } from "react-icons/bs"
import { BsGearFill } from "react-icons/bs"
import { PiPlantFill } from "react-icons/pi";
import { SiMessenger } from "react-icons/si";
import { GrUserExpert } from "react-icons/gr";
import { FaDiagnoses } from "react-icons/fa";
import { GiFarmer } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { MdOutlineVideoSettings } from "react-icons/md";
import { FaDisease } from "react-icons/fa";

export const navigation = [
    { name: "Les étapes de production", href: "/production", available: true },
    // { name: "Créer un plan de culture", href: "/create-plan", available: false },
    // { name: "Faire un diagnostic", href: "/diagnostic", available: true },
    { name: "Les maladies", href: "/diagnosis", available: true },
  ]

  export const DashboardAgriculteur = [
    {
      href: "/dashboard/agriculteur/",
      icon: BsGridFill,
      text: "Dashboard",

    },
    {
      href: "/dashboard/agriculteur/farm",
      icon: GiFarmer,
      text: "Ma ferme",
      subLinks: [
        { href: "/dashboard/agriculteur/farm/list", text: "Mes parcelles" },
        { href: "/dashboard/agriculteur/farm/create", text: "Créer une parcelle" },
      ],
    },

    {
      href: "/dashboard/agriculteur/planning",
      icon: PiPlantFill ,
      text: "Plan de culture",
    },
    {
      href: "/dashboard/agriculteur/events",
      icon: BsCalendarEventFill,
      text: "Mon calendrier",
    },
    // {
    //   href: "/dashboard/agriculteur/expert",
    //   icon: GrUserExpert,
    //   text: "Les experts agricoles",
    // },
    {
      href: "/dashboard/agriculteur/consultations",
      icon: SiMessenger,
      text: "Consultation",
      subLinks: [
        { href: "/dashboard/agriculteur/consultations/list", text: "Mes consultations" },
        { href: "/dashboard/agriculteur/consultations/create", text: "Demande de consultation" },
      ],
    },
    {
      href: "/dashboard/agriculteur/diagnostic",
      icon: FaDiagnoses,
      text: "Diagnostic",
      subLinks: [
        { href: "/dashboard/agriculteur/diagnostic/list", text: "Mes diagnostics" },
        { href: "/dashboard/agriculteur/diagnostic/create", text: "Demande de diagnostics" },
      ],
    },

  ]

  export const DashboardExpert= [
    {
      href: "/dashboard/expert/",
      icon: BsGridFill,
      text: "Dashboard",
    },
    {
      href: "/dashboard/expert/consultation/list",
      icon: SiMessenger,
      text: "Consultation",
    },
    {
      href: "/dashboard/expert/diagnostic/list",
      icon: FaDiagnoses,
      text: "Diagnostic",
    },
  ]

  export const DashboardAdmin= [
    {
      href: "/dashboard/admin/",
      icon: BsGridFill,
      text: "Dashboard",
      subLinks: [

      ],
    },
    {
      href: "/dashboard/admin/users",
      icon: FaUsers,
      text: "Utilisateurs",
    },
    {
      href: "/dashboard/admin/videos",
      icon: MdOutlineVideoSettings,
      text: "Les vidéos",
    },
    {
      href: "/dashboard/admin/diseases",
      icon: FaDisease,
      text: "Les maladies",
    },
  ]