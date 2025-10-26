import express from "express";
import statusRouter from "./routes/status";
import postsRouter from "./routes/posts";
import userPostsRouter from "./routes/userPosts";

const app = express();

app.use(express.json());
app.use("/status", statusRouter);
app.use("/posts", postsRouter);
app.use("/userPosts", userPostsRouter);

export default app;
