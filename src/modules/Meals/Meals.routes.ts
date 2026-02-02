import { Router } from "express";
import { MealsController } from "./Meals.controller";

const router = Router();

router.post("/meals", MealsController.createMeals);
router.patch("/meals/:id", MealsController.updateMeals);
router.delete("/meals/:id", MealsController.deleteMeals);


export const MealsRoutes: Router = router;
