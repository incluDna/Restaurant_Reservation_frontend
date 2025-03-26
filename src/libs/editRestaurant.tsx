export default async function editRestaurants(
    token: string,
    id: string,
    updatedFields: {
        name?: string;
        address?: string;
        district?: string;
        province?: string;
        postalcode?: string;
        tel?: string;
        region?: string;
        opentime?: string;
        closetime?: string;
        picture?: string;
    }
) {
    try {
        const response = await fetch(`https://restaurant-reservation-backend-blush.vercel.app/api/v1/restaurants/${id}`, {
            method: "PUT",  // ใช้ PUT ถ้าต้องการอัปเดตทั้งหมด แต่ถ้าต้องการอัปเดตบางฟิลด์ ใช้ PATCH
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(updatedFields),  // ส่งเฉพาะค่าที่ต้องการอัปเดต
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to update restaurant: ${errorMessage}`);
        }

        return await response.json();  // คืนค่าข้อมูลที่อัปเดต
    } catch (error) {
        console.error("Update restaurant error:", error);
        throw error;
    }
}
