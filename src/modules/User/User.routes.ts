import { Router } from "express";
import { userController } from "./User.controller";
import auth, { UserRoles } from "../../middlewares/auth";

const router = Router();
router.get(
  "/myProfile",
  auth(UserRoles.ADMIN, UserRoles.CUSTOMER, UserRoles.PROVIDER),
  userController.getUserProfile,
);
router.patch(
  "/myProfile",
  auth(UserRoles.ADMIN, UserRoles.CUSTOMER, UserRoles.PROVIDER),
  userController.updateUserProfile,
);
export const userRoutes: Router = router;
