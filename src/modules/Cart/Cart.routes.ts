import { Router } from "express";
import { cartControllers } from "./Cart.controller";
import auth, { UserRoles } from "../../middlewares/auth";

const router=Router();  
router.post('/add-to-cart',auth(UserRoles.CUSTOMER), cartControllers.addToCart);
router.get('/get-cart-items',auth(UserRoles.CUSTOMER), cartControllers.getCartItems);
router.delete('/remove-from-cart/:cartItemId',auth(UserRoles.CUSTOMER), cartControllers.removeFromCart);
router.delete('/clear-cart',auth(UserRoles.CUSTOMER), cartControllers.clearCart);
export const cartRoutes:Router=router;
