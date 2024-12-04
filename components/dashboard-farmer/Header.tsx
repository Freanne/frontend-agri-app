'use client'
import React from 'react'
import { BsSearch } from 'react-icons/bs'
import Avatar from 'react-avatar';
const Header = () => {
  return (
    <div className='m-4 grid grid-cols-3'>

      <h1 className='flex items-end text-xl whitespace-nowrap mt-2 font-medium'>Hello Anne-Marie !</h1>

      <div className="relative flex h-fit max-h-fit w-full md:w-[400px] lg:w-[400px] items-center">
        <input
          type="text"
          placeholder="Search here..."
          className="h-10 w-full rounded-lg bg-white border border-gray-50 pl-10 text-sm md:h-12 md:text-base"
        />
        <button className="absolute inset-y-0 left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <BsSearch size={15} />
        </button>
      </div>

      <div className='ml-auto'>
          <Avatar name="Anna AKOTEGNON" size="50" round={true} src='' color='green' />
      </div>

    </div>
  )
}

export default Header