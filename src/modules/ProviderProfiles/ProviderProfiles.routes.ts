import { Router } from "express";
import { ProviderProfilesController } from "./ProviderProfiles.controller";

const router = Router();
router.post("/", ProviderProfilesController.createProviderProfiles);
router.post("/meals", ProviderProfilesController.createMeals);
router.patch("/meals/:id", ProviderProfilesController.updateMeals);
router.delete("/meals/:id", ProviderProfilesController.deleteMeals);
export const ProviderProfilesRoutes: Router = router;
