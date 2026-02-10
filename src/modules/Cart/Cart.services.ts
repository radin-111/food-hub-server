import { prisma } from "../../lib/prisma";

const addToCart=async(cartItem:any)=>{
    const result=await prisma.cart.create({
        data:cartItem
    })
    return result;
}
const getCartItems=async(userId:any)=>{
    const result=await prisma.cart.findMany({
        where:{
            userId
        }
    })
    return result;
}
const removeFromCart=async(cartItemId:any)=>{
    const result=await prisma.cart.delete({
        where:{
            id:cartItemId
        }
    })
    return result;
}

const clearCart=async(userId:any)=>{
    const result=await prisma.cart.deleteMany({
        where:{
            userId
        }
    })
    return result;
}

export const cartServices={
    addToCart,
    getCartItems,
    removeFromCart,
    
    clearCart
}