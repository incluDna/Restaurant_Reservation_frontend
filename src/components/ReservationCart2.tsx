"use client"
import deleteReservation from "@/libs/deleteReservation";
import { ReservationJson } from "../../interfaces"
import { Session } from "next-auth";
import Link from "next/link";
export default  function ReservationCart2({reservationJson,session}:
    {reservationJson:ReservationJson,session:Session}){
    const onDelete= (rid:string) => {
            
            alert('delete reservation ')
            deleteReservation(
              
                session.user.token,rid
              ).then(() => {
                    window.location.reload(); // ทำการรีโหลดหน้า
                })
              
              
            
    };
    return(
        <>
        <div className="flex flex-row items-end">
        <div className="font-serif text-xl"> Reservations</div>
        {/* <button className='bg-amber-800 text-white rounded border border-white
            font-serif text-xl py-2 px-2 m-2 z-50 ml-auto
            hover:bg-white  hover:text-amber-800 hover:border-transparent'>
            Add Reservation
        </button> */}
        </div>    
        <div className=" w-[100%] p-10">
           
        {
            reservationJson.data.map((reservationItem)=>(
                <Link href={`/reservations/?rid=${reservationItem._id}` }className="w-1/5"key={reservationItem._id}>
                <div className="bg-slate-200 rounded px-5 py-2 my-2 hover:bg-yellow-50"
                    key={reservationItem._id}>
                        <div className="text-md">Restaurant ID : {reservationItem.restaurant._id.toString()}</div>
                        <div className="text-sm">Quantity {reservationItem.quantity}</div>
                        <div className="text-sm">Reservaition Date {reservationItem.resDate} </div>
                        <button className='bg-amber-800 text-white rounded border border-white
                            font-serif text-xl py-2 px-2 m-2 z-50 
                            hover:bg-white  hover:text-amber-800 hover:border-transparent'
                            onClick={(e)=>{
                                e.stopPropagation(); e.preventDefault(); 
                                onDelete(reservationItem._id??'')
                                }}>
                            Remove Reservation
                        </button>
                </div>
                </Link>
                
            ))
         }
            
        </div>
    </>
    )
}
