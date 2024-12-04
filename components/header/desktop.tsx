"use client"

import React, { Dispatch, SetStateAction } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
// import toast from "react-hot-toast"
import { BsSearch } from "react-icons/bs"
import { MdOutlineLogin } from "react-icons/md"

import { navigation } from "@/constants/navigation"
import { classNames } from "@/utils"
import { Bars3Icon } from "@heroicons/react/24/outline"
import { XMarkIcon } from "@heroicons/react/24/outline"

import Logo from "../logo"

// import UserDropdownMenu from "./userDropdownMenu"

const DesktopMenu = ({
  setMobileMenuOpen,
  mobileMenuOpen,
}: {
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>
  mobileMenuOpen: boolean
}) => {
  const pathname = usePathname()

  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 text-gray-700 lg:px-8" aria-label="Global">
      <div className="flex items-center gap-8">
        <Link href="/" className="-m-1.5 p-1.5">
          <Logo />
        </Link>
      </div>
      <div className="flex lg:hidden">
        {!mobileMenuOpen ? (
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="size-6" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="size-6" aria-hidden="true" />
          </button>
        )}
      </div>
      <div className="hidden lg:flex lg:gap-x-8">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={classNames(
              "relative whitespace-nowrap text-lg font-semibold leading-6 hover:text-green-600",
              item.href === pathname ? "text-green-600" : "text-gray-900"
            )}
          >
            <span className="relative z-10">{item.name}</span>
          </Link>
        ))}
        <span className="block border-l leading-6" />
        <Link href='/signin' passHref>
        <button
          type="button"
          className="flex items-center whitespace-nowrap text-lg font-semibold leading-6 text-gray-900"
        
        >
          <span>Se connecter </span>
        </button>
        </Link>
        {/* {false && <UserDropdownMenu />} */}
      </div>
    </nav>
  )
}

export default DesktopMenu
