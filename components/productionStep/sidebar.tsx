'use client'
import React from "react"
import Link from "next/link"

import { categories } from "@/constants/categories"
import { classNames } from "@/utils"

const Sidebar = ({ searchParams }: { searchParams: string }) => {
  return (
    <nav className="hidden px-6 lg:block">
      <h1 className="mb-4 mt-40 pl-6 text-base font-bold">
        Etapes de production du mais 
        {/* <span className="sr-only">Liste de toutes les catégories disponibles.</span> */}
      </h1>
      <ul className="relative space-y-4 border-l border-gray-200 pl-6">
        <li className="relative">
          <Link href={`/production`} className={classNames("hover:text-green-600")}>
            <span className={classNames(!searchParams ? "text-green-600" : "", "whitespace-nowrap")}>Toutes</span>
            <div
              className={classNames(
                "absolute -left-[25px] top-0 z-10 h-full w-full border-green-600",
                !searchParams ? "border-l-2 text-green-600" : ""
              )}
            />
          </Link>
        </li>
        {categories.map((item) => (
          <li key={item.name} className="relative">
            <Link href={`/production?cat=${item.tag}`} className={classNames("hover:text-green-600")}>
              <span className={classNames(searchParams?.endsWith(item.tag) ? "text-green-600" : "", "whitespace-nowrap")}>
                {item.name}
              </span>
              <div
                className={classNames(
                  "absolute -left-[25px] top-0 z-10 h-full w-full border-green-600",
                  searchParams?.endsWith(item.tag) ? "border-l-2 text-green-600" : ""
                )}
              />
            </Link>
          </li>
        ))}
      </ul>
      <span className="absolute"></span>
    </nav>
  )
}

export default Sidebar
