import { Router } from "express";
import { ProviderProfilesController } from "./ProviderProfiles.controller";



const router = Router();
router.post("/", ProviderProfilesController.createProviderProfiles);

export const ProviderProfilesRoutes: Router = router;
