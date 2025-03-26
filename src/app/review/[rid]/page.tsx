
import { Pattaya } from "next/font/google";
import getRestaurant from '@/libs/getRestaurant';
import { getServerSession } from "next-auth";
import getReviewsforRestaurant from "@/libs/getReviewforRestaurant";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ReviewItem } from "../../../../interfaces";

const pattaya = Pattaya({ weight: "400", subsets: ["thai", "latin"] });

export default async function Review({params}:{params:{rid:string}}) {
  const session =await getServerSession(authOptions);
  if(!session)return null

  const reviews=await getReviewsforRestaurant(session.user.token,params.rid)

  const name=await getRestaurant(params.rid,session.user.token);
  // console.log(reviews)
 

  return (
    <div className='p-10 w-[80%] mx-auto text-left font-serif'>
      <h1 className={pattaya.className} style={{ fontSize: "72px" }}>{name.data.name} Restaurant Reviews</h1>
            
            <div style={{ display:"flex",flexDirection:"row",
            flexWrap:"wrap",justifyContent:"space-around",
            alignContent:"space-around"}}>{
              reviews.data.map((review:ReviewItem)=>(
                <div className="text-left p-5 m-5 flex flex-col w-full rounded-xl bg-yellow-50 border border-green-600
                text-xl">
                  <div>User:{review.user}</div>
                  <div>Star:{review.reviewStar}</div>
                  <div >Description:{review.Description}</div>
                </div>
                ))
            }
            </div>
    </div>
  );
}
