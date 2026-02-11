import { Router } from "express";
import { orderControllers } from "./Orders.controller";
import auth, { UserRoles } from "../../middlewares/auth";

const router = Router();
router.post('/create-order',auth(UserRoles.CUSTOMER), orderControllers.createOrder);
router.get('/get-orders',auth(UserRoles.CUSTOMER), orderControllers.getOrders);
router.get('/provider-orders',auth(UserRoles.PROVIDER), orderControllers.getProviderOrders);
router.patch('/update-order-status/:id',auth(UserRoles.PROVIDER,UserRoles.CUSTOMER), orderControllers.updateOrderStatus);
export const orderRoutes: Router = router;
