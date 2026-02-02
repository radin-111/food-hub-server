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
const app: Application = express();

app.use(
  cors({
    origin: process.env.APP_URL!,
    credentials: true,
  }),
);
app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/provider", ProviderProfilesRoutes);
app.use("/users", UsersRoutes);
app.use("/meals", MealsRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("We are cooking foods.");
});

export default app;
