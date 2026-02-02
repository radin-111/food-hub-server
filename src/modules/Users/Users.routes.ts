import { Router } from "express";
import { userControllers } from "./Users.controller";
import auth from "../../middlewares/auth";
import { useRoles } from "../../types/userRoles";

const router = Router();
router.get("/", auth(useRoles.ADMIN), userControllers.getAllUsers);
router.patch("/:id/role", auth(useRoles.ADMIN), userControllers.updateUserRole);
export const UsersRoutes: Router = router;
