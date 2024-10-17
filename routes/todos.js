import { Router } from "express";
import { ObjectId } from 'mongodb';
import { connectDB } from "../db.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const database = await connectDB();
    const todosCollection = database.collection("todos");
    const data = await todosCollection.find().toArray();
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const database = await connectDB();
    const todosCollection = database.collection("todos");

    const data = await todosCollection.findOne({_id: new ObjectId(req.params.id)});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.post("/", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

export default router;