import getRestaurants from "@/libs/getRestaurants";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { Pattaya } from "next/font/google";
import RestaurantCatalog from "@/components/RestaurantCatalog";

const pattaya = Pattaya({ weight: "400", subsets: ["thai", "latin"] }); 


export default function Car(){

    const restaurant=getRestaurants();
    
    return( 
        <main className="text-center p-5 ">
            <h1 className={pattaya.className} style={{ fontSize: "40px" }}>Select Your Restaurants</h1>
            <Suspense fallback={<p>Loading ...<LinearProgress/></p>}>
            <RestaurantCatalog venuesJson={restaurant} />
            </Suspense>
            <hr className="my-10"/>

        </main>
    )
}