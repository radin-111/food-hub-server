import { Router } from "express";
import { MealsController } from "./Meals.controller";
import auth, { UserRoles } from "../../middlewares/auth";

const router = Router();
router.get("/", MealsController.getAllMeals);
router.get("/myMeals",auth(UserRoles.PROVIDER), MealsController.getMyMeals);
router.post("/",auth(UserRoles.PROVIDER), MealsController.createMeals);
router.patch("/:id",auth(UserRoles.PROVIDER), MealsController.updateMeals);
router.delete("/:id",auth(UserRoles.PROVIDER), MealsController.deleteMeals);
router.get("/categories", MealsController.getAllCategories);
router.post("/categories",auth(UserRoles.ADMIN), MealsController.createCategories);
router.patch("/categories/:id",auth(UserRoles.ADMIN), MealsController.updateCategories);



export const MealsRoutes: Router = router;
