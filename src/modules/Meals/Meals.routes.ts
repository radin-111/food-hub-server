import { Router } from "express";
import { MealsController } from "./Meals.controller";
import auth, { UserRoles } from "../../middlewares/auth";

const router = Router();
router.get("/", MealsController.getAllMeals);
router.post("/", MealsController.createMeals);
router.patch("/:id", MealsController.updateMeals);
router.delete("/:id", MealsController.deleteMeals);
router.get("/categories",auth(UserRoles.ADMIN,UserRoles.PROVIDER), MealsController.getAllCategories);
router.post("/categories",auth(UserRoles.ADMIN), MealsController.createCategories);


export const MealsRoutes: Router = router;
