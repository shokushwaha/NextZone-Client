import React from 'react'
import Link from 'next/link'
export default function Catprod({ products }) {
    return (
        <>
            {
                products.map(prod => (
                    <>
                        <div key={prod._id}>
                            <div className='flex  p-4 items-center my-4 '>
                                <img src={prod.images[0]} alt="image" className='h-40 w-80 rounded-md shadow hover:scale-110' />
                                <div className='flex flex-col gap-4 px-4'>
                                    <span className='uppercase text-2xl'>

                                        {prod.title}
                                    </span>
                                    <span className='text-gray-500'>

                                        {prod.description.substring(1, 200)}...    <Link href={'/product/' + prod._id} className='text-black' >Read More</Link>
                                    </span>

                                    <span className='flex items-center justify-between'>
                                        <span>

                                            Price:
                                        </span>
                                        <span className='text-2xl text- bold'>
                                            ${prod.price}
                                        </span>

                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                ))
            }
        </>
    )
}