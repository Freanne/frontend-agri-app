
import Image from "next/image"
import React from "react"
import logo from '@/public/images/cornmaster.png'
const Logo = () => {
  return (

      <Image
        src={logo}
        alt="logo"
        className="h-10 w-auto"
        width={500}
        height={500}
      />
    
  )

}

export default Logo
