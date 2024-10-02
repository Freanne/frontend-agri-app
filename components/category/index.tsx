import Image from 'next/image'
import React from 'react'
import ban from '@/public/images/diseases-mais/furariose_tige_mais.png'
const DiagnosisSection = () => {
  return (
    <div className='m-12 p-12'>
        <div className='bg-green-600 flex items-center justify-center shadow-2xl shadow-gray-400 size-64 rounded-lg'>
            <div>
                <Image
                    src={ban}
                    alt=''
                    width={500}
                    height={500}
                    className='rounded-full size-36'
                />
                <p className='text-center text-xl pt-4 text-white font-semibold'>Fruit</p>
            </div>
        </div>
    </div>
  )
}

export default DiagnosisSection 