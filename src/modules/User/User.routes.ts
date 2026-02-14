import { Router } from "express";
import { userController } from "./User.controller";
import auth, { UserRoles } from "../../middlewares/auth";

const router = Router();
router.get(
  "/myProfile",
  auth(UserRoles.ADMIN, UserRoles.CUSTOMER, UserRoles.PROVIDER),
  userController.getUserProfile,
);
router.get(
  "/customer-statistics",
  auth(UserRoles.CUSTOMER),
  userController.getCustomerStatistics,
);
router.get(
  "/provider-statistics",
  auth(UserRoles.PROVIDER),
  userController.getProviderStatistics,
);
router.get(
  "/admin-statistics",
  auth(UserRoles.ADMIN),
  userController.getAdminStatistics,
);
router.patch(
  "/myProfile",
  auth(UserRoles.ADMIN, UserRoles.CUSTOMER, UserRoles.PROVIDER),
  userController.updateUserProfile,
);
export const userRoutes: Router = router;
