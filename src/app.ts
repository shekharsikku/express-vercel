import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import env from "./utils/env";
import { corsOrigin, expressSession } from "./middleware";

const app = express();

app.use(
  express.json({
    limit: "100kb",
    strict: true,
  })
);

app.use(
  express.urlencoded({
    limit: "100kb",
    extended: true,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(corsOrigin);
app.use(expressSession);
app.use(cookieParser(env.COOKIES_SECRET));
env.NODE_ENV === "development" ? app.use(morgan("dev")) : null;

app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  try {
    console.error(`Error: ${err.message}`);
    return res.status(500).json({ message: "Internal server error!" });
  } catch (error) {
    next(error);
  }
});

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).send({ message: "Hello, from Vercel!" });
});

import UserRouter from "./router/user";

app.use("/api/user", UserRouter);

export default app;
