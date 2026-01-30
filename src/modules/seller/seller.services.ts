import { prisma } from "../../lib/prisma"

interface CreateMedicinePayload {
  name: string;
  genericName?: string;
  brand?: string;
  category?: string;
  description?: string;
  price: number;
  discount?: number;
  stock?: number;
  expiryDate?: Date;
  sellerEmail?: string;
  image?: string;
  status?: string;
}

const createMedicine=async(payload:CreateMedicinePayload)=>{
const medicine=await prisma.medicine.create({
data:{
   ...payload,
        discount: payload.discount || 0,
        stock: payload.stock || 0,
        status: payload.status || "active",
}
})
    console.log("Medicine added to DB:", medicine);
    return medicine;
}

const getMedicine=async()=>{
    const getMedicine=await prisma.medicine.findMany()
    return getMedicine
}

const getSingleMedicine=async(id:string)=>{
   const result= await prisma.medicine.findUnique({
    where:{
        id
    }
   })
   return result
}
export const sellerService={
    createMedicine,getMedicine,getSingleMedicine
}