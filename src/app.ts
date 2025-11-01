import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

// rate limiter
const limiter = rateLimit({ windowMs: 60 * 1000, max: 100 });
app.use(limiter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/api/v1", routes);

// error handler
app.use(errorHandler);

export default app;
