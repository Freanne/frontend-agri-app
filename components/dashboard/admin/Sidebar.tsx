"use client"
import React from "react"
import { DashboardAdmin } from "@/constants/navigation"
import MenuLink from "../MenuLink"
import Image from "next/image"
import logo from "@/public/Corn-Master-GG1.png"

const SidebarAdmin = () => {
  return (
    <div>
      <div className="mx-6 mt-4">
        <Image src={logo} width={300} height={300} alt="logo" className="w-72" />
      </div>

      <div className="mt-10">
        {DashboardAdmin.map((item, index) => (
          <MenuLink
            key={index}
            href={item.href}
            icon={item.icon}
            text={item.text}
            subLinks={item.subLinks} // 🔥 Ajout des sous-liens
          />
        ))}
      </div>
    </div>
  )
}

export default SidebarAdmin