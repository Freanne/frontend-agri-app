'use client'

import { useAuth } from "@/context/AuthContext";
import { CalendarIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const Dashboard = () => {

  const {user} = useAuth()

    return (
      <div className="bg-white text-black w-64 p-4 rounded-lg m-4">
        <p className="text-xl font-bold">Nombre de parcelles</p>
        <p className="flex items-end justify-end mt-5 px-5 font-semibold">2</p>
      </div>
    )
      
};

export default Dashboard