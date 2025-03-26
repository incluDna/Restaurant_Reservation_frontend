'use client'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import addRestaurant from "@/libs/addRestaurant";
import editRestaurants from "@/libs/editRestaurant";
import { TextField } from "@mui/material";
import { getServerSession, Session } from "next-auth";
import { Pattaya } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const pattaya = Pattaya({ weight: "400", subsets: ["thai", "latin"] }); 


export default  function Restaurantform({ session }: { session: Session  }) {
          
  const urlParams = useSearchParams();
  const [rid, setRid] = useState<string>("");

  useEffect(() => {
    const idFromUrl = urlParams.get("id");
    if (idFromUrl) setRid(idFromUrl);
  }, [urlParams]); 

  const [name, setName] = useState<string>('');
  const [address, setaddress] = useState<string>('');
  const [district, setdistrict] = useState<string>('');
  const [province, setprovince] = useState<string>('');
  const [postalcode, setpostalcode] = useState<string>('');
  const [tel, settel] = useState<string>('');
  const [region, setregion] = useState<string>('');
  const [opentime, setopentime] = useState<string>('');
  const [closetime, setclosetime] = useState<string>('');  
  const [picture, setpicture] = useState<string>(''); 

  const makeRestaurant= () => {
    if (name && address && district&&province&&postalcode&&
        tel&&region&&opentime&&closetime&&picture) {

      addRestaurant(
        
        session.user.token,{
            name: name,
            address: address,
            district: district,
            province: province,
            postalcode: postalcode,
            tel: tel,
            region: region,
            opentime: opentime,
            closetime: closetime,
            picture: picture
        }
        
      );
      alert("Add Restaurant Successfully!");

      
    }else if(rid){
        
        const restaurantData = {
            ...(name && { name }),
            ...(address && { address }),
            ...(district && { district }),
            ...(province && { province }),
            ...(postalcode && { postalcode }),
            ...(tel && { tel }),
            ...(region && { region }),
            ...(opentime && { opentime }),
            ...(closetime && { closetime }),
            ...(picture && { picture }),
          };
            editRestaurants(session.user.token, rid, restaurantData);
          alert("Restaurant updated successfully!");
    }
  };

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4">
        {rid?
        <div className={pattaya.className} style={{ fontSize: "96px" }}>Edit Restaurant</div>
        :
        <div className={pattaya.className} style={{ fontSize: "96px" }}>New Restaurant</div>
        }
      
      

      <div className="w-[50%] space-y-2 bg-yellow-50 p-5 rounded-xl border border-green-600">
        <div className="font-serif text-lg text-md text-left text-gray-600">
        Restaurant Information
        </div>
        <div>
            <div className="flex flex-row px-2">
            <div className="w-[30%]">Restaurant Name :</div>
            <TextField variant="standard" name="Name" label="Name"
            className="flex justify-center w-[70%]" value={name}
            onChange={(e) => {
                setName(e.target.value );
            }}
            />
            </div>
            <div className="flex flex-row ">
                <div className="flex flex-row px-2">
                <div className="w-[30%]">Address :</div>
                <TextField variant="standard" name="Address" label="Address"
                className="flex justify-center w-[70%]" value={address}
                onChange={(e) => {
                    setaddress(e.target.value );
                }}
                />
                </div>
                <div className="flex flex-row px-2">
                <div className="w-[30%]">District :</div>
                <TextField variant="standard" name="District" label="District"
                className="flex justify-center w-[70%]" value={district}
                onChange={(e) => {
                    setdistrict(e.target.value );
                }}
                />
                </div>
            </div>
             <div className="flex flex-row py-3">
                <div className="flex flex-row px-2">
                <div className="w-[30%]">Province :</div>
                <TextField variant="standard" name="Province" label="Province"
                className="flex justify-center w-[70%]" value={province}
                onChange={(e) => {
                    setprovince(e.target.value );
                }}
                />
                </div>
                <div className="flex flex-row px-2">
                <div className="w-[40%]">Postalcode :</div>
                <TextField variant="standard" name="Postalcode" label="Postalcode"
                className="flex justify-center w-[60%]" value={postalcode}
                onChange={(e) => {
                    setpostalcode(e.target.value );
                }}
                />
                </div>
            </div>
            <div className="flex flex-row ">
                <div className="flex flex-row px-2">
                <div className="w-[30%]">Region :</div>
                <TextField variant="standard" name="Region" label="Region"
                className="flex justify-center w-[70%]" value={region}
                onChange={(e) => {
                    setregion(e.target.value );
                }}
                />
                </div>
                <div className="flex flex-row px-2">
                <div className="w-[30%]">Tel :</div>
                <TextField variant="standard" name="Tel" label="Tel"
                className="flex justify-center w-[70%]" value={tel}
                onChange={(e) => {
                    settel(e.target.value );
                }}
                />
                </div>
            </div>
            <div className="flex flex-row ">
                <div className="flex flex-row px-2">
                <div className="w-[40%]">Open Time :</div>
                <TextField variant="standard" name="Open Time" label="Open Time(XX:XX)"
                className="flex justify-center w-[60%]" value={opentime}
                onChange={(e) => {
                    setopentime(e.target.value );
                }}
                />
                </div>
                <div className="flex flex-row px-2">
                <div className="w-[40%]">Close Time :</div>
                <TextField variant="standard" name="Close Time" label="Close Time(XX:XX)"
                className="flex justify-center w-[60%]" value={closetime}
                onChange={(e) => {
                    setclosetime(e.target.value );
                }}
                />
                </div>
            </div>
            <div className="flex flex-row px-2">
            <div className="w-[30%]">Link Picture :</div>
            <TextField variant="standard" name="Picture" label="Picture"
            className="flex justify-center w-[70%]" value={picture}
            onChange={(e) => {
                setpicture(e.target.value );
            }}
            />
            </div>
        </div>
      </div>

      <button
        className="font-serif
        block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
        onClick={makeRestaurant}
      >
        add or edit this Restaurant
      </button>
    </main>
  );

}