import { Router } from "express";
import { orderControllers } from "./Orders.controller";

const router = Router();
router.post('/create-order',orderControllers.createOrder);
export const orderRoutes: Router = router;
