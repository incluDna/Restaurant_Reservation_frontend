import { PickerValueUpdateAction } from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types"
import mongoose from "mongoose"

export interface ReservationItem{
    _id?: string,
    resDate:string,
    user:mongoose.Types.ObjectId,
    restaurant:mongoose.Types.ObjectId,
    quantity:string
}
export interface ReservationJson{
  success: boolean,
  count: number,
  pagination: Object,
  data: ReservationItem[]
}
export interface MeanReviewItem{
  success:string,
  name:string,
  totalRating:string,
  count:number
}

export interface RestaurantItem{
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,    
    region: string,
    opentime: string,    
    closetime: string,    
    picture: string
}
export interface RestaurantJson{
    success: boolean,
    count: number,
    pagination: Object,
    data: RestaurantItem[]
}
export interface ReviewItem{
  _id?: string,
  user: string,
  restaurant: string,
  reviewStar: string,
  Description: string,
}
export interface ReviewJson{
  success: boolean,
  count: number,
  pagination: Object,
  data: ReviewItem[]
}

  export interface BookingItem {
    nameLastname: string;
    tel: string;
    venue: string;
    bookDate: string;
  }