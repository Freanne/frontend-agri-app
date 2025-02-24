'use client'
import React from 'react'
import { DashboardExpert } from '@/constants/navigation'
import MenuLink from '../MenuLink'
import Image from 'next/image';
import logo from '@/public/Corn-Master-GG1.png'
const SidebarExpert = () => {
  const topMenu = DashboardExpert;
  return (
    <div className=''>
      <div className='mx-6 mt-4'>
          <Image 
            src={logo}
            width={300}
            height={300}
            alt=''
            className='w-72'
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

export default SidebarExpert