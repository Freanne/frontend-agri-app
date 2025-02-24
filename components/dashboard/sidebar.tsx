'use client'
import React from 'react'
import MenuLink from './MenuLink'
import Image from 'next/image';
import logo from '@/public/Corn-Master-GG1.png'
import { useAuth } from '@/context/AuthContext';
import SidebarAgriculteur from './agriculteur/Sidebar';
import SidebarExpert from './expert/Sidebar';
import SidebarAdmin from './admin/Sidebar';
const Sidebar = () => {
  const { user } = useAuth();
  return(
      <div>
        {
          user?.user_type === "farmer" && (
            <SidebarAgriculteur/>
          )
        }

        {
          user?.user_type === "expert" && (
            <SidebarExpert/>
          )
        }

        {
          user?.user_type === "admin" && (
            <SidebarAdmin/>
          )
        }
      </div>
  )
  // const topMenu = DashboardNavigation;
  // return (
  //   <div className=''>
  //     <div className='mx-6 mt-4'>
  //         <Image 
  //           src={logo}
  //           width={300}
  //           height={300}
  //           alt=''
  //           className='w-72'
  //         />
  //     </div>

  //     <div className="mt-10">
  //       {topMenu.map((item, index) => (
  //         <MenuLink
  //           key={index}
  //           href={item.href}
  //           icon={item.icon} 
  //           text={item.text}
  //         />
  //       ))}
  //     </div>
  //   </div>
  // )
}

export default Sidebar

