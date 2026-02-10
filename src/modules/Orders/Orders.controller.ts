import { type Request, type Response } from "express";
import { orderServices } from "./Orders.services";

const createOrder=async(req:Request,res:Response)=>{
    const order=req.body;
    try {
        const result=await orderServices.createOrder(order);
        res.status(201).json({
            success:true,
            message:'Order created successfully',
            data:result
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'Failed to create order',
            error:error
        })
    }
}



export const orderControllers={
createOrder
}