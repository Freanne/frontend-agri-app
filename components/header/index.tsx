// import React from 'react'
// import Logo from '../logo'
// import Link from 'next/link'
// // import { IoPerson } from "react-icons/io5";
// // import { FaRegBell } from "react-icons/fa6";

// const Header = () => {
//   return (
//     <div className='grid grid-cols-3 gap-5 items-center mx-10 my-6 text-xl'>
//         <Link href='/' className='mr-auto'>
//             <Logo/>
//         </Link>
      
//         <div className='flex items-center justify-center gap-x-5'>
//             <Link href='/'>Home</Link>
//             <Link href='/'>Product</Link>
//             <Link href='/'>Services</Link>
//             <Link href='/'>Blog</Link>
//         </div>
//         <div className='ml-auto flex gap-x-5'>
//             <Link href='/signin' className='border-1 border-slate-500 bg-green-300 p-2 rounded-md w-48 flex items-center justify-center font-medium'> Se connecter</Link>
//             <Link href='/signup' className='border-1 border-slate-500 bg-green-300 p-2 rounded-md w-48 flex items-center justify-center font-medium'>S&apos;inscrire</Link>
//         </div>
//     </div>
//   )
// }

// export default Header


// 'use client'
// import React, { useState } from 'react';
// import Logo from '../logo';
// import Link from 'next/link';
// import { IoPerson } from 'react-icons/io5';
// import { FaRegBell } from 'react-icons/fa6';
// import { HiMenu } from 'react-icons/hi';

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className='flex justify-between items-center mx-10 my-6 text-xl'>
//       <Link href='/' className='mr-auto'>
//         <Logo />
//       </Link>

//       {/* Menu Hamburger Icon */}
//       <div className='md:hidden'>
//         <button onClick={toggleMenu} className='focus:outline-none'>
//           <HiMenu size={30} />
//         </button>
//       </div>

//       {/* Navigation Links */}
//       <div className={`flex items-center gap-x-5 md:flex md:gap-x-10 ${isOpen ? 'flex' : 'hidden'} md:block`}>
//         <Link href='/'>Home</Link>
//         <Link href='/'>Product</Link>
//         <Link href='/'>Services</Link>
//         <Link href='/'>Blog</Link>
//       </div>

//       {/* Authentication Links */}
//       <div className='ml-auto hidden md:flex gap-x-5'>
//         <Link href='/signin' className='border border-slate-500 bg-green-300 p-2 rounded-md w-48 flex items-center justify-center font-medium'>
//           Se connecter
//         </Link>
//         <Link href='/signup' className='border border-slate-500 bg-green-300 p-2 rounded-md w-48 flex items-center justify-center font-medium'>
//           S&apos;inscrire
//         </Link>
//       </div>

//       {/* Mobile Authentication Links
//       <div className='md:hidden flex gap-x-5'>
//         <Link href='/signin' className='border border-slate-500 bg-green-300 p-2 rounded-md w-32 flex items-center justify-center font-medium'>
//           Se connecter
//         </Link>
//         <Link href='/signup' className='border border-slate-500 bg-green-300 p-2 rounded-md w-32 flex items-center justify-center font-medium'>
//           S&apos;inscrire
//         </Link>
//       </div> */}
//     </div>
//   );
// };

// export default Header;


"use client"

import { useState } from "react"

import useScrollStart from "@/hooks/useScrollStart"
import { classNames } from "@/utils"

import DesktopMenu from "./desktop"
import MobileMenu from "./mobile"

export default function Header({ bgColor }: { bgColor: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isVisible } = useScrollStart()

  return (
    <header
      className={classNames(
        bgColor,
        "sticky top-0 z-50 h-[88px] w-full",
        isVisible ? "shadow-[0_0_5px_lightgray]" : ""
      )}
    >
      <DesktopMenu mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <MobileMenu mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
    </header>
  )
}
