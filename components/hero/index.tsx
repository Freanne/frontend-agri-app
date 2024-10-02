import Image from 'next/image'
import React from 'react'
import bg from '@/public/images/image_background.jpg'
import ban from '@/public/images/ban_5.jpg'

const HeroSection = () => {
  return (
    <div
      className="my-12 p-12 relative bg-green-500 h-[400px] w-full"
    >
  <Image
    src={bg}
    alt=""
    layout="fill"
    objectFit="cover"
    className="absolute inset-0 z-0 opacity-20"

  />
  <div className="relative z-10 text-white p-4 flex items-center mx-10">
      <div className='my-10' >
         <h1 className='text-6xl font-semibold'> Discover Modern Agriculture and <br />Create a Greener future</h1> 
         <p className='text-xl my-4 ml-4'>Modern agriculture represents a paradigm shift in the way we approach food production.</p>
         <button className='bg-white text-green-500 p-4 rounded-xl font-semibold mx-6 ml-8'>Learn More</button>
      </div>
      <div className='shrink-0 ml-auto relative rounded-2xl size-60'>
        {/* <Image
          src={}
          alt=''
          width={500}
          height={500}
          className='absolute inset-0 z-0 border-4 border-white rounded-2xl' 
        /> */}

      </div>
  </div>
</div>
  )
}

export default HeroSection