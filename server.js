import express from "express";
import todoRouter from "./routes/todos.js";
import cors from "cors";

const app = express();
const port = 3000;

// middleware
app.use(cors()); // setzt notwendige Header automatisch damit wir Zugriff haben vom Frontend aus
app.use(express.json()); // damit wir Zugriff haben auf req.body

app.use("/api/todos", todoRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}`));