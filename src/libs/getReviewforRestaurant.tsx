
export default async function getReviewsforRestaurant(token:string,id:string) {

    const response=await fetch(`https://restaurant-reservation-backend-blush.vercel.app/api/v1/restaurants/${id}/reviews`, {
        method:"GET",
        headers:{
            authorization:`Bearer ${token}`,
        }
    })

    if(!response.ok){
        throw new Error("failed to loaded the reviews")
    }
    return await response.json();
}