import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";

const app: Application = express();
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:5000",
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("We are cooking foods.");
});

export default app;
