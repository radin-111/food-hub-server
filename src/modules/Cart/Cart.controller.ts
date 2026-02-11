import { type Request, type Response } from "express";
import { cartServices } from "./Cart.services";

const addToCart=async(req:Request,res:Response)=>{
    const cartItem=req.body;
    cartItem.userId=req.user?.id;
    try {
        const result=await cartServices.addToCart(cartItem);
        res.status(201).json({
            success:true,
            message:'Cart item added successfully',
            data:result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Internal server error',
            error
        })
    }
}
const getCartItems=async(req:Request,res:Response)=>{
    const userId=req.user?.id;
    const page =Number(req.query.page) || 1;
    try {
        const result=await cartServices.getCartItems(userId,page);
        res.status(201).json({
            success:true,
            message:'Cart items fetched successfully',
            data:result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Internal server error',
            error
        })
    }
}

const removeFromCart=async(req:Request,res:Response)=>{
    const {cartItemId}=req.params;
    try {
        const result=await cartServices.removeFromCart(cartItemId);
        res.status(201).json({
            success:true,
            message:'Cart item removed successfully',
            data:result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Internal server error',
            error
        })
    }
}


const clearCart=async(req:Request,res:Response)=>{
    const userId=req.user?.id;
    try {
        const result=await cartServices.clearCart(userId);
        res.status(201).json({
            success:true,
            message:'Cart cleared successfully',
            data:result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Internal server error',
            error
        })
    }
}

export const cartControllers={
    addToCart,
    getCartItems,
    removeFromCart,
    
    clearCart
}