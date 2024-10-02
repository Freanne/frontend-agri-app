import Image from 'next/image'
import React from 'react'

import Link from 'next/link'


const CardDiagnosis = ({image,name, pathogene,id } : {image:string | undefined, name:string, pathogene:string, id:number},) => {
  
  return (
      <div className='border border-black rounded size-96 h-fit mx-5'>
            <div className="">
                    <Image
                    src={image as string}
                    alt={name}
                    className="object-cover size-64 rounded-sm w-full"
                    width={500}
                    height={500}
                    />
            </div>
            <div className='mt-4 flex h-24 p-2'>
              <div className='text-lg'>
                <p>{name}</p>
                <hr className='border-1 border-slate-400'/>
                <p>{pathogene}</p>
              </div>
                <div className='ml-auto border-l p-2'>
                  <Link href="/">information</Link>
                </div>
            </div>
      </div>


  )
}

export default CardDiagnosis