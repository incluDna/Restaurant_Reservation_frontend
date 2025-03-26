import { Dayjs } from "dayjs";

export default async function editReservation(
  token: string,
  res: string,

  resDate?: Dayjs, // Make resDate optional
  quantity?: string  // Make quantity optional
) {
  const body: any = {
  };

  if (resDate) body.resDate = resDate;
  if (quantity) body.quantity = quantity;

  console.log('token:',token)
  console.log('res:',res)
  console.log('resDate:',resDate??'')
  console.log('quantity:',quantity??'')

  const response = await fetch(
    `https://restaurant-reservation-backend-blush.vercel.app/api/v1/reservations/${res}`,
    {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(body), // Send only the fields that are not undefined
    }
  );

  if (!response.ok) {
    throw new Error("failed to add the reservation");
  }
  return await response.json();
}
