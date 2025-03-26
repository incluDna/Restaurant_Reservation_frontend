'use client'
import Link from "next/link";
import {RestaurantItem,RestaurantJson} from "../../interfaces";
import deleteRestaurant from "@/libs/deleteRestaurant";
import { Session } from "next-auth";

export default function RestaurantCart({venuesJson,session}:
    {venuesJson:RestaurantJson,session:Session}){
    const venuesJsonready= venuesJson
    
    const onDelete= (rid:string) => {
        
        alert('delete restaurant ')
          deleteRestaurant(
            
            session.user.token,rid
          ).then(() => {
                // รีโหลดหน้าเมื่อการลบสำเร็จ
                window.location.reload(); // ทำการรีโหลดหน้า
            })
          
          
        
      };
    return(
        <>
        <div className="flex flex-row items-end">
        <div className="font-serif text-xl"> {venuesJsonready.count} Restaurant in our catalog</div>
        <Link href='/restaurant/manage/add'className='
             m-2 z-50 ml-auto'>
        <button className='bg-amber-800 text-white rounded border border-white
            font-serif text-xl py-2 px-2 
            hover:bg-white  hover:text-amber-800 hover:border-transparent'>
            Add Restaurant
        </button>
        </Link>
        </div>    
            <div className=" w-[100%] p-10">
            {
            venuesJsonready.data.map((carditem:RestaurantItem)=>
                (
                    <Link href={`manage/add?id=${carditem._id}` }className="w-1/5"key={carditem._id}>
                    <div className="bg-slate-200 rounded px-5 py-2 my-2
                    hover:bg-yellow-50"
                    key={carditem._id}>
                        <div className="text-xl">ID:{carditem._id}</div>
                        <div className="text-sm">Name  {carditem.name} </div>
                        <div className="text-sm">Open-time  {carditem.opentime} </div>
                        <div className="text-sm">Close-time {carditem.closetime}  </div>
                        <div className="text-md">{carditem.tel}</div>
                        <button className='bg-amber-800 text-white rounded border border-white
                            font-serif text-xl py-2 px-2 m-2 z-50 
                            hover:bg-white  hover:text-amber-800 hover:border-transparent'
                            onClick={(e)=>{
                                e.stopPropagation(); e.preventDefault(); 
                                onDelete(carditem._id)
                                }}>
                            Remove Restaurant
                        </button>
                    </div>
                    </Link>
                ))
            }
            
        </div>
        </>
    )

}

