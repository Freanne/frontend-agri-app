import React from "react"
import Link from "next/link"
import { IconType } from "react-icons"
const MenuLink = ({ href, icon: Icon, text }: { href: string; icon: IconType; text: string }) => {
  return (
    <Link href={href}>
      <div className="mx-6 my-2 text-base hover:rounded-lg hover:bg-green-300 font-medium">
        <p className="flex items-center p-2">
          <span className="mr-4 shrink-0 text-lg">
            <Icon />
          </span>
          <span className="grow">{text}</span>
        </p>
      </div>
    </Link>
  )
}

export default MenuLink