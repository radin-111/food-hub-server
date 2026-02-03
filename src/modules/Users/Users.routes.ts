import { Router } from "express";
import { userControllers } from "./Users.controller";
import auth from "../../middlewares/auth";
import { useRoles } from "../../types/userRoles";

const router = Router();
// router.get("/statistics/provider", auth(useRoles.PROVIDER), userControllers.getStatistics);

router.get("/", auth(useRoles.ADMIN), userControllers.getAllUsers);
router.patch("/:id/role", auth(useRoles.ADMIN), userControllers.updateUserRole);
export const UsersRoutes: Router = router;
