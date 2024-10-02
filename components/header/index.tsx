import React from 'react'
import Logo from '../logo'
import Link from 'next/link'
import { IoPerson } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";

const Header = () => {
  return (
    <div className='grid grid-cols-3 gap-5 items-center mx-10 my-6 text-xl'>
        <Link href='/' className='mr-auto'>
            <Logo/>
        </Link>
      
        <div className='flex items-center justify-center gap-x-5'>
            <Link href='/'>Home</Link>
            <Link href='/'>Product</Link>
            <Link href='/'>Services</Link>
            <Link href='/'>Blog</Link>
        </div>
        <div className='ml-auto flex gap-x-5'>
            <p className='rounded-full bg-green-300 p-2'>
                <IoPerson />
            </p>
            <p className='rounded-full bg-green-300 p-2'>
                <FaRegBell/>
            </p>
            
        </div>
    </div>
  )
}

export default Header