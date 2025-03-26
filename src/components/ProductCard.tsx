'use client'
import Image from 'next/image'
import InteractiveCard from './InteractiveCard'
import { Rating } from '@mui/material';
import { useRouter } from "next/navigation"
import { useEffect, useState } from 'react'; // Importing useState and useEffect to handle client-side only logic
import { ReviewJson } from '../../interfaces';
import Link from 'next/link';

export default function ProductCard({ carName, imgSrc, rid ,meanreview}:
    { carName: string, imgSrc: string,  rid: string ,meanreview?:string}) {
    
    const router = useRouter();
    const [isClient, setIsClient] = useState(false); // State to track if the component is mounted on the client

    useEffect(() => {
        // Set isClient to true once the component is mounted on the client-side
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // Prevent rendering on the server-side (return nothing during SSR)
    }

    return (
        <InteractiveCard contentName={carName} >
            <div className='bg-yellow-50 h-full w-full'>
                <div className='w-full h-[70%] relative rounded-t-lg '>
                    <Image src={imgSrc} 
                        alt='Product Picture'
                        fill={true}
                        className='object-cover rounded-t-lg'
                    />
                </div>

                <div className='w-full h-[15%] p-[10px]'>
                    {carName}
                </div>
                {meanreview?
                <div className="flex flex-row items-end ">
                <div className='flex flex-row  m-2'>
                    <div>
                        <Rating readOnly defaultValue={parseInt(meanreview)} onClick={(e) => { e.stopPropagation(); }}  />
                    </div>
                    
                    <Link href={`/review/${rid}` }>
                    <div className='text-sm underline hover:text-blue-600' onClick={(e) => {
                        e.stopPropagation();
                    }}>
                        {meanreview}
                    </div>
                    </Link>

                </div>

                <Link href={`/review/manage/add?rid=${rid}`}
                    className=' m-2 z-50 ml-auto'>
                    <button className='bg-amber-800 text-white rounded border border-white
                        font-serif text-sm py-2 px-2 
                        hover:bg-white hover:text-amber-800 hover:border-transparent'>
                        +Review
                    </button>
                </Link>

            </div>
                
                :null}
                

            </div>
        </InteractiveCard>
    );
}
