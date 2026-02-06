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
  auth(UserRoles.PROVIDER),
  ProviderProfilesController.updateProviderProfiles,
);
router.patch(
  "/requests/:id",
  auth(UserRoles.ADMIN),
  ProviderProfilesController.updateProviderProfilesRequest,
);
router.get(
  "/",
  auth(UserRoles.ADMIN),
  ProviderProfilesController.getAllProviderProfiles,
);
router.get(
  "/myProviderProfile",
  auth(UserRoles.PROVIDER,UserRoles.CUSTOMER),
  ProviderProfilesController.getProviderProfilesById,
);
export const ProviderProfilesRoutes: Router = router;
