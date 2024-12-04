'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Sidebar from './sidebar'
import Filter from './Filter'
import { useSearchParams } from 'next/navigation'
import { categories } from '@/constants/categories'

const ProductionStep = () => {
    const searchParams = useSearchParams().get("cat")

    const catSelected = useMemo(() => {
      if (searchParams) return categories.find((item) => item.tag === searchParams)
      return { name: "Toutes", tag: "", uuid: "", videoSrc:'', description:'' }
    }, [searchParams])
  

  return (
    <div className="relative isolate">
      <div className="mx-auto flex max-w-7xl gap-x-10 px-6 lg:pl-0">
        <Sidebar searchParams={searchParams as string} />
        <div className="w-full">
          <Filter
            cat={catSelected?.name as string}
          />
          <div className="mb-6 w-full items-center justify-between sm:flex">
            <h2 className="mb-4 whitespace-nowrap text-2xl font-bold sm:mb-0">{catSelected?.name}</h2>
          </div>
          <div className="flex flex-col ">
            {catSelected?.videoSrc && (
              <div className="w-full max-w-7xl mb-4">
                {/* <video className="w-full rounded-lg shadow-lg" controls>
                  <source src={catSelected.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video> */}
                <video
                src={catSelected.videoSrc}
                controls
                className="w-full h-full rounded-lg object-cover"
                />
              </div>
            )}

            {/* Afficher le texte correspondant */}
            <div className="mt-2 text-justify">
              {/* <p className="text-lg text-gray-600">
                {catSelected?.description}
              </p> */}
                {/* <div 
                  className="text-lg text-gray-600"
                  dangerouslySetInnerHTML={{ __html: catSelected?.description }}
                /> */}


                {catSelected?.description ? (
                    <div
                      className="text-lg text-gray-600"
                      dangerouslySetInnerHTML={{ __html: catSelected.description }}
                    />
                  ) : (
                    <p className="text-lg text-gray-600">Aucune description disponible.</p>
                  )}
            </div>

          </div>
            
        </div>
      </div>
    </div>
  )
}

export default ProductionStep