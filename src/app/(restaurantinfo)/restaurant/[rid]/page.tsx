import Image from "next/image";
//import getCar from "@/libs/getCar";
import getRestaurant from "@/libs/getRestaurant";
import Link from "next/link";
import { Pattaya } from "next/font/google";

const pattaya = Pattaya({ weight: "400", subsets: ["thai", "latin"] }); 


export default async function RestaurantDetailPage({params}:{params:{rid:string}}){
    const RestaurantDetail=await getRestaurant(params.rid);

    return( 
        <main className="text-center p-5 font-serif bg-amber-50 rounded-xl border-lime-500 border-b-8">
            <h1 className={pattaya.className} style={{ fontSize: "72px" }}>{RestaurantDetail.data.name} Restaurant</h1>
            <div className="flex flex-row my-5 text-left"> 
                <Image src={RestaurantDetail.data.picture} alt="Venue Img font-bold"
                width={0} height={0} sizes="100vw"
                className="rounded-lg w-[30%]"/>
                <div className="flex flex-col my-5 mx 5 ">
                <div className="text-2xl mx-5  ">Name: {RestaurantDetail.data.name}</div>
                <div className="text-xl mx-5   mr-12">Address: {RestaurantDetail.data.address} District: {RestaurantDetail.data.district}</div>
                <div className="text-xl mx-5   mr-12">Province: {RestaurantDetail.data.province} Postalcode: {RestaurantDetail.data.postalcode}</div>
                <div className="text-xl mx-5   ">Region: {RestaurantDetail.data.region}</div>
                <div className="text-xl mx-5   ">Tel: {RestaurantDetail.data.tel}</div>
                <div className="text-xl mx-5   ">Open Time: {RestaurantDetail.data.opentime} - Close Time: {RestaurantDetail.data.closetime}</div>

                </div>
            </div>
            <Link href={`/reservations?id=${params.rid}&name=${RestaurantDetail.data.name}`}>
                <button className='bg-amber-800 text-white rounded border border-white
                    font-serif text-xl py-2 px-2 m-2 z-50 
                    hover:bg-white  hover:text-amber-800 hover:border-transparent'>
                    Make Reservation
                </button>
            </Link>

        </main>

    )
}

// export async function generateStaticParams() {
//     return[{rid:"001"},{rid:"002"},{rid:"003"},{rid:"004"}]
// }