import style from './topmenu.module.css'
import Image from 'next/image'
import Topmenuitem from './TopMenuItem'
import { getServerSession } from 'next-auth'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'
import { Link } from '@mui/material'
import getUserProfile from "@/libs/getUserProfile";


export default async function Topmenu(){

    const session =await getServerSession(authOptions);

    return(
        <div className={style.menucontainer}>
            <Link href='/'><Image src={'/image/logo.png'}className={style.logoimg}
            alt='logo' width={0} height={0} sizes='100vh'/></Link>

            <Topmenuitem title='Restaurant' pageRef='/restaurant'/>
            <Topmenuitem title='Reservation' pageRef='/reservations/manage'/>
            <Topmenuitem title='About' pageRef='/about'/>

            <div className='absolute right-5 h-full flex flex-row '>
                <Topmenuitem title='Manage' pageRef='/manage'/>
                {
                    session?
                    (async () => {
                        const profile=await getUserProfile(session.user?.token);
                        console.log(profile)
                        return(
                            <Link href='/api/auth/signout'><div className='flex items-center h-full px-2 text-cyan-600 text-sm'>Sign-Out of {profile.data.name}</div></Link>
                        )
                    })()
                    :  <Link href='/api/auth/signin'><div className='flex items-center h-full px-2 text-cyan-600 text-sm'>Sign-In</div></Link>
                    
                }
            </div>
            
        </div>
    )
}