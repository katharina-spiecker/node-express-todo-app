import express from "express";
import { ObjectId } from 'mongodb';
import { connectDB } from "./db.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/api/todos", async (req, res) => {
  try {
    const database = await connectDB();
    const todosCollection = database.collection("todos");
    const data = await todosCollection.find().toArray();
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/todos/:id", async (req, res) => {
  try {
    const database = await connectDB();
    const todosCollection = database.collection("todos");

    const data = await todosCollection.findOne({_id: new ObjectId(req.params.id)});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.post("/api/todos", async (req, res) => {
  const newTodo = req.body;
  
  try {
    const database = await connectDB();
    const todosCollection = database.collection("todos");

    const data = await todosCollection.insertOne(newTodo);
    res.json({message: "insertion successful", insertedId: data.insertedId});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.delete("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  try {
      const database = await connectDB();
      const todosCollection = database.collection("todos");

      const data = await todosCollection.deleteOne({_id: new ObjectId(id)});
      res.json(data);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
})

app.put("/api/todos/:id", async (req, res) => {
  try {
    const database = await connectDB();
    const todosCollection = database.collection("todos");

    const updatedTodo = req.body;
    const data = await todosCollection.updateOne({_id: new ObjectId(req.params.id)}, {$set: updatedTodo})

    if (data.matchedCount === 1) {
      res.json({message: "insertion successful", data: data});
    } else {
      res.status(404).json({message: "Todo not found"})
    }
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.listen(port, () => console.log(`Server is listening on port ${port}`));