import Restaurantform from "@/components/Restaurantform";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";



export default async function addRestaurant() {
    const session =await getServerSession(authOptions);
    
    return (
        <main className="p-10">
            add and edit restaurant
            {
            session?
            <Restaurantform session={session}/>
            :null
            }
            
        </main>
    )
}