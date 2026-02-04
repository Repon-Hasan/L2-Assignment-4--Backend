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

const createMedicine = async (payload: CreateMedicinePayload) => {
  const medicine = await prisma.medicine.create({
    data: {
      ...payload,
      price: Number(payload.price), // ensure float
      discount: Number(payload.discount) || 0,
      stock: Number(payload.stock) || 0,
      expiryDate: payload.expiryDate ? new Date(payload.expiryDate) : null,
      status: payload.status || "active",
    },
  });
  console.log("Medicine added to DB:", medicine);
  return medicine;
};


const getMedicine=async()=>{
    const getMedicine=await prisma.medicine.findMany()
    return getMedicine
}

const getMyMedicine = async (sellerEmail: string) => {
  const medicines = await prisma.medicine.findMany({
    where: { sellerEmail },
  });
  return medicines;
};




export const sellerService={
    createMedicine,getMedicine,getMyMedicine
}