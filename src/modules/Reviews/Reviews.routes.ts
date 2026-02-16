import { Router } from "express";
import { reviewControllers } from "./Reviews.controller";
import auth, { UserRoles } from "../../middlewares/auth";

const router = Router();
router.post(
  "/submit-review",
  auth(UserRoles.CUSTOMER),
  reviewControllers.submitReview,
);
export const reviewRoutes: Router = router;
