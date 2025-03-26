import Productcard from "./ProductCard"
import Link from "next/link"
import getMeanReviews from "@/libs/getMeanReview";
import {MeanReviewItem, RestaurantItem,RestaurantJson} from "../../interfaces";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function RestaurantCatalog({venuesJson}:{venuesJson:Promise<RestaurantJson>}){
    const venuesJsonready=await venuesJson
    const session =await getServerSession(authOptions);
    // if(session&&venuesJsonready){
    //     const meanreview=await getMeanReviews(session.user.token,venuesJsonready.data._id)
    // }
    const reviewsMap: { [key: string]: MeanReviewItem } = {};

    if(session){
    const meanReviewsPromises = venuesJsonready.data.map( (carditem: RestaurantItem) => 
        {
             return getMeanReviews(session.user.token, carditem._id)
        }
    );
    const meanReviews = await Promise.all(meanReviewsPromises);
    meanReviews.forEach((review, index) => {
        console.log(review)
        reviewsMap[venuesJsonready.data[index]._id] = review;
    });
    
    }
    return(
        <>
        <div className="font-serif text-xl">Explore {venuesJsonready.count} Restaurant in our catalog</div>
            
            <div style={{margin:"20px", display:"flex",flexDirection:"row",
            flexWrap:"wrap",justifyContent:"space-around",
            alignContent:"space-around"}}>{
                venuesJsonready.data.map((carditem:RestaurantItem)=>(
                    <Link href={`/restaurant/${carditem._id}` }className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%]
                                                p-2 sm:p-4 md:p-4 lg:p-8"key={carditem._id}>
                    {session?
                    <Productcard carName={carditem.name} imgSrc={carditem.picture} rid={carditem._id} 
                    meanreview={reviewsMap[carditem._id]?.totalRating || 'No Reviews'}
                    />
                    :
                    <Productcard carName={carditem.name} imgSrc={carditem.picture} rid={carditem._id} 
                   
                   />
                    }
                   
                    </Link>
                ))
            }
            </div>
        </>
    )

}
