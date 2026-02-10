import { prisma } from "../../lib/prisma";

const createOrder=async(order:any)=>{
    const result=await prisma.orders.create({
        data:order
    })
    return result;
}


export const orderServices={
    createOrder
}
