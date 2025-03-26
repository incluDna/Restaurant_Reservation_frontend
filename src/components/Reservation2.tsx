"use client";

import LocationDateReserve from "@/components/LocationDateReserveServer";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { ReservationItem, RestaurantItem, RestaurantJson } from "../../interfaces"; 
import { Pattaya } from "next/font/google";
import addReservation from "@/libs/addReservations";
import mongoose from "mongoose";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import editReservation from "@/libs/editReservation";

const pattaya = Pattaya({ weight: "400", subsets: ["thai", "latin"] }); 

export default  function ReservationsClient({ userid,userName,restaurants ,session}: 
    { userid:string,userName: string ,restaurants:RestaurantJson,session:Session}) {

  const profile= getUserProfile(session?.user?.token??'');
      
  const urlParams = useSearchParams();
  const [rid, setRid] = useState<string>("");
  useEffect(() => {
      const idFromUrl = urlParams.get("rid");
      if (idFromUrl) setRid(idFromUrl);
    }, [urlParams]); 

  const [pickupDate, setPickupDate] = useState<Dayjs | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [restaurant, setRestaurant] = useState<string>(urlParams.get("name")||'');
  
  const makeReservation = () => {

  
    if (rid) {
      if(pickupDate)editReservation(session.user.token, rid, pickupDate,quantity.toString());
      else editReservation(session.user.token, rid, undefined,quantity.toString());
      alert('Edit Reservation ')
    }
    else if (quantity && restaurant && pickupDate) {
        const restaurantitem = restaurants.data.find((r: RestaurantItem) => r.name === restaurant);
        const restaurantid=restaurantitem?._id??''

      console.log(pickupDate)
      addReservation(
      
        session.user.token,
        pickupDate,
        userid,
        restaurantid,
        quantity.toString()
      
      );
      alert('Add Reservation ')
      
    }
  };

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4">
      <div className={pattaya.className} style={{ fontSize: "96px" }}>New Reservation</div>
      <div className="text-xl font-serif">User : {userName}</div>

      <div className="w-fit space-y-2">
        <div className="font-serif text-lg text-md text-left text-gray-600">
        Reservation Information
        </div>
        <LocationDateReserve
                  onDateChange={(value: Dayjs) => setPickupDate(value)}
                  onLocationChange={(value: string) => setRestaurant(value)}
                  onQuantityChange={(value: string) => setQuantity(Number(value))}

                restaurants={restaurants}  
                rid={rid} 
        />
      </div>

      <button
        className="font-serif
        block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
        onClick={makeReservation}
      >
        Reserve this Restaurant
      </button>
    </main>
  );
}
