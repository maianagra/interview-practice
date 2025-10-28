import express from "express";
import statusRouter from "./routes/status";
import claimsRouter from "./routes/claims";

const app = express();

app.use(express.json());
app.use("/status", statusRouter);
app.use("/claims", claimsRouter);

export default app;
