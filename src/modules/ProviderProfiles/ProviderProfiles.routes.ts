import { Router } from "express";
import { ProviderProfilesController } from "./ProviderProfiles.controller";
import auth, { UserRoles } from "../../middlewares/auth";

const router = Router();
router.post(
  "/",
  auth(UserRoles.CUSTOMER),
  ProviderProfilesController.createProviderProfiles,
);
router.get("/requests",auth(UserRoles.ADMIN),ProviderProfilesController.getProviderProfilesRequest);
router.patch(
  "/:id",
  auth(UserRoles.ADMIN),
  ProviderProfilesController.updateProviderProfiles,
);
router.get(
  "/",
  auth(UserRoles.ADMIN),
  ProviderProfilesController.getAllProviderProfiles,
);
export const ProviderProfilesRoutes: Router = router;
