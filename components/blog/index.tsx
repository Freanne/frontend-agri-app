import Image from 'next/image'
import React from 'react'
import ban from '@/public/images/ban_1.jpg'
const BlogSection = () => {
  return (
    <div>
        <div className=''>
            <Image
                src={ban}
                alt=''
                width={500}
                height={500}

            />
            <h1>
                    From Farm to Table,Exploring the 
                    Journey of Agro Produce
            </h1>
            <p>
                Exploring the Journey of Agro Produce delves into 
                the intricate process of bringing agricultural 
                products from farms to consumers tables. This 
                enlightening exploration traces the various stages 
                of production, including cultivation, harvesting, 
                processing, packaging, distribution, and retail.
            </p>
            <button className='w-full text-white bg-green-700 text-lg'>Read More</button>
        </div>
    </div>
  )
}

export default BlogSection