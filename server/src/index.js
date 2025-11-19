import express from "express";
import dotenv from "dotenv";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from "cors";
import { auth } from "./lib/auth.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Log incoming auth requests for debugging callback redirects
app.use("/api/auth", (req, res, next) => {
  try {
    console.log("[auth request]", req.method, req.originalUrl);
    console.log("[auth request] query:", req.query);
    console.log(
      "[auth request] headers: host=",
      req.headers.host,
      "referer=",
      req.headers.referer
    );
  } catch (e) {
    console.log("[auth request] logging error", e);
  }
  next();
});

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

app.get("/health", (req, res) => {
  res.send("ok");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `your application is running on http://localhost:${process.env.PORT}`
  );
});
