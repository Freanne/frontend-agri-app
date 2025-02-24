// import React from "react"
// import Link from "next/link"
// import { IconType } from "react-icons"
// import { usePathname } from "next/navigation";
// const MenuLink = ({ href, icon: Icon, text }: { href: string; icon: IconType; text: string }) => {
//   const pathname = usePathname()
//   const isActive = pathname === href

//   return (
//     <Link href={href}>
//       <div 
//       //  className="my-4 mr-16 text-base hover:rounded-r-full hover:bg-green-100 hover:text-green-900 font-normal hover:font-semibold"
//       className={`my-4 mr-16 text-base font-normal flex items-center rounded-r-full
//         ${isActive ? "bg-green-100 text-green-900 font-semibold" : "hover:bg-green-100 hover:text-green-900 hover:font-semibold"}`}

//       >
//         <p className="flex items-center py-2 pl-8">
//           <span className="mr-6 shrink-0 text-base">
//             <Icon />
//           </span>
//           <span className="grow">{text}</span>
//         </p>
//       </div>
//     </Link>
//   )
// }

// export default MenuLink


"use client"
import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconType } from "react-icons"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

interface MenuLinkProps {
  href: string
  icon: IconType
  text: string
  subLinks?: { href: string; text: string }[]
}

const MenuLink = ({ href, icon: Icon, text, subLinks }: MenuLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href || subLinks?.some(sub => pathname === sub.href)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      {/* <div
        className={`my-4 mr-16 text-base font-normal flex items-center py-2 pl-8 pr-2 rounded-r-full cursor-pointer 
          ${isActive ? "bg-green-100 text-green-900 font-semibold" : "hover:bg-green-100 hover:text-green-900 hover:font-semibold"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-6 shrink-0 text-base">
          <Icon />
        </span>
        <span className="grow">{text}</span>
        {subLinks && (isOpen ? <IoIosArrowUp className="ml-auto" /> : <IoIosArrowDown className="ml-auto" />)}
      </div>

      {isOpen && subLinks && (
        <div className="ml-10">
          {subLinks.map((sub, index) => (
            <Link key={index} href={sub.href}>
              <p className={`py-2 pl-8 text-sm rounded-r-full ${pathname === sub.href ? "bg-green-200 text-green-900 font-semibold" : "hover:bg-green-200 hover:text-green-900 hover:font-semibold"}`}>
                {sub.text}
              </p>
            </Link>
          ))}
        </div>
      )} */}

      {/* 🔥 Si pas de sous-liens, alors un vrai Link */}
      {subLinks ? (
        <div
          className={`my-4 mr-16 text-base font-normal flex items-center py-2 pl-8 pr-2 rounded-r-full cursor-pointer 
            ${isActive ? "bg-green-100 text-green-900 font-semibold" : "hover:bg-green-100 hover:text-green-900 hover:font-semibold"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="mr-6 shrink-0 text-base">
            <Icon />
          </span>
          <span className="grow">{text}</span>
          {subLinks && (isOpen ? <IoIosArrowUp className="ml-auto" /> : <IoIosArrowDown className="ml-auto" />)}
        </div>
      ) : (
        <Link href={href} className="block">
          <div
            className={`my-4 mr-16 text-base font-normal flex items-center py-2 pl-8 pr-2 rounded-r-full cursor-pointer 
              ${isActive ? "bg-green-100 text-green-900 font-semibold" : "hover:bg-green-100 hover:text-green-900 hover:font-semibold"}`}
          >
            <span className="mr-6 shrink-0 text-base">
              <Icon />
            </span>
            <span className="grow">{text}</span>
          </div>
        </Link>
      )}

      {/* 🔽 Affichage des sous-liens */}
      {isOpen && subLinks && (
        <div className="ml-10">
          {subLinks.map((sub, index) => (
            <Link key={index} href={sub.href}>
              <p
                className={`py-2 pl-8 text-sm rounded-r-full ${
                  pathname === sub.href ? "bg-green-200 text-green-900 font-semibold" : "hover:bg-green-200 hover:text-green-900 hover:font-semibold"
                }`}
              >
                {sub.text}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default MenuLink
