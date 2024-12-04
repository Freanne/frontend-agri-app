'use client'
import React from 'react'
import { DashboardNavigation } from '@/constants/navigation'
import MenuLink from './MenuLink'
import Image from 'next/image';
import logo from '@/public/Corn-Master-GG1.png'
const SidebarFarmer = () => {
  const topMenu = DashboardNavigation.filter(item => !item.position);
  return (
    <div className=''>
      <div className='mx-6 mt-4'>
          <Image 
            src={logo}
            width={500}
            height={500}
            alt=''
            className='w-full'
          />
      </div>

      <div className="mt-10">
        {topMenu.map((item, index) => (
          <MenuLink
            key={index}
            href={item.href}
            icon={item.icon} 
            text={item.text}
          />
        ))}
      </div>
    </div>
  )
}

export default SidebarFarmer