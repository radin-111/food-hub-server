import { Router } from "express";
import { ProviderProfilesController } from "./ProviderProfiles.controller";


const router = Router();
router.post("/", ProviderProfilesController.createProviderProfiles);
router.patch("/:id", ProviderProfilesController.updateProviderProfiles);

export const ProviderProfilesRoutes: Router = router;
