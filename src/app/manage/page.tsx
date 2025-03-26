import { getServerSession } from 'next-auth';
import Link from 'next/link'; 
import { authOptions } from '../api/auth/[...nextauth]/route';
import getUserProfile from '@/libs/getUserProfile';

export default  async function ManagePage(){
    const session =await getServerSession(authOptions);
    if(!session)return null
    const profile=await getUserProfile(session.user.token);
    
    

    return(
        <div className='p-10 font-serif text-4xl '>
            <Link href='/reservations/manage'className=' hover:text-cyan-600 hover:underline'><div >
                - Manage your reservations</div></Link>

            <Link href='/review/manage'className=' hover:text-cyan-600 hover:underline'><div>
                - Manage your review</div></Link>
            {(profile.data.role=='admin')?
                <Link href='/restaurant/manage'className=' hover:text-cyan-600 hover:underline'><div>
                - Manage restaurant</div></Link>
                :null
            } 
            

        </div>
    )
}