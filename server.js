import express from "express";
import todoRouter from "./routes/todos.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/todos", todoRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}`));