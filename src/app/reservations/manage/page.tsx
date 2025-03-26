import { Pattaya } from "next/font/google";
import getReservations from "@/libs/getReservations"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ReservationCart2 from "@/components/ReservationCart2";

const pattaya = Pattaya({ weight: "400", subsets: ["thai", "latin"] });

export default async function ManageReservations() {
    const session =await getServerSession(authOptions);
    const reservation=await getReservations(session?.user?.token??'');
    return (
        <main className="w-full p-10">
            <h1 className={`${pattaya.className} text-center text-4xl`} style={{ fontSize: "40px" }}>Manage Reservations</h1>

            {/* <ReservationCart/> */}
            {session?<ReservationCart2 reservationJson={reservation} session={session}/>
            :null}
            
        </main>
    )
}