'use client'
import React from 'react'

import { useRouter } from "next/navigation"
import { categories } from '@/constants/categories'

interface FilterProps {
    cat: string
}
const Filter = ({ cat }: FilterProps) => {
    const router = useRouter()

    const handleChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCat = categories.find((item) => item.name === ev.currentTarget.value)
      const tag = selectedCat?.tag
      const path = tag ? `/production?cat=${tag}` : "/production"
      router.push(path)
    }
  return (
    <div className='mt-8 lg:mt-24 mb-8'>
        <div className="relative">
        {/* <small className="absolute -top-2.5 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2 italic text-gray-500">
          Trié par catégorie
        </small> */}
        <select
          name=""
          id=""
          value={cat}
          onChange={handleChange}
          className="w-full rounded-md border-0 py-3 px-3 text-base text-gray-700 shadow-sm outline-none ring-1 ring-inset bg-white ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700"
        >
          <option value="Toutes" defaultValue={""}>
            Toutes
          </option>
          {categories.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

    </div>
  )
}

export default Filter