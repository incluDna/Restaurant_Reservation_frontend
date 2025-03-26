'use client'
import { useState } from 'react';
import styles from './banner.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Pattaya } from "next/font/google";

const pattaya = Pattaya({ weight: "400", subsets: ["thai", "latin"] }); 

export default function banner(){
    const covers=['/image/cover3.jpg', '/image/cover5.jpg', '/image/cover7.jpg'];
    const [index,setIndex]=useState(0);
    const rounter =useRouter();

    const{data:session}=useSession();
    console.log(session?.user.token);

    return( 
        <div className={styles.banner} onClick={()=> {setIndex(index+1)}}>
            <Image src={covers[index%3]}
            alt='cover'
            fill={true}
            objectFit='cover'
            priority
            /> 
            {/* <div className={`${styles.bannerText} ${pattaya.className}`}> */}

            <div className={styles.bannerText}>
                <h1 className={pattaya.className} style={{ fontSize: "96px", color:'white' }}>Your Dining Experience Awaits</h1>
                <h3 className='text-3xl font-serif text-white'>MOODENG Restaurant Reservation App</h3>
            </div>

            {session?
                <div className='z-30 absolute top-5 right-10 font-semibold text-cyan-800 text-xl'> 
                    Hello! {session.user?.name}
                </div>
                : null
            }

            <button className='bg-amber-800 text-white rounded border border-white
            font-serif text-xl py-2 px-2 m-2 z-50 
            absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 
            hover:bg-white  hover:text-amber-800 hover:border-transparent'
            onClick={(e)=>{rounter.push('/restaurant');e.stopPropagation()}}>
                Select Your Restaurants
            </button>

        </div>
    )
}