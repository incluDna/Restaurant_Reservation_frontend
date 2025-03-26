import { Dayjs } from "dayjs";

export default async function addReservation(token:string,
    resDate:Dayjs,userId:string,restaurantId:string,quantity:string) {
        // console.log("token : ",token);
        // console.log("resDate : ",resDate);
        // console.log("userId : ",userId);
        // console.log("restaurantId : ",restaurantId);
        // console.log("quantity : ",quantity);


        
    const response=await fetch(`https://restaurant-reservation-backend-blush.vercel.app/api/v1/restaurants/${restaurantId}/reservations`, {
        method:"POST",
        headers:{
            authorization:`Bearer ${token}`,
            "Content-Type": "application/json", // Ensure the Content-Type is set

        },
        body:JSON.stringify({
            resDate: resDate,
            user: userId,
            quantity: quantity,
        })
    });
    if(!response.ok){
        throw new Error("failed to add the reservation")
    }
    return await response.json();
}