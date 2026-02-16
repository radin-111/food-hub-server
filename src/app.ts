import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import "./lib/prisma";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { ProviderProfilesRoutes } from "./modules/ProviderProfiles/ProviderProfiles.routes";
import { UsersRoutes } from "./modules/Users/Users.routes";
import { MealsRoutes } from "./modules/Meals/Meals.routes";
import { cartRoutes } from "./modules/Cart/Cart.routes";
import cookieParser from "cookie-parser";
import { orderRoutes } from "./modules/Orders/Orders.routes";
import { userRoutes } from "./modules/User/User.routes";
import { reviewRoutes } from "./modules/Reviews/Reviews.routes";
const app: Application = express();

app.use(
  cors({
    origin: process.env.APP_URL!,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/provider", ProviderProfilesRoutes);
app.use("/users", UsersRoutes);
app.use("/meals", MealsRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);
app.use("/reviews", reviewRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("We are cooking foods.");
});

export default app;
