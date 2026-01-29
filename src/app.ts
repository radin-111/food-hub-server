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
const app: Application = express();
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:5000",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/provider", ProviderProfilesRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("We are cooking foods.");
});

export default app;
