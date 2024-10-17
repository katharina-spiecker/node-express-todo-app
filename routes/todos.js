import { Router } from "express";

const router = Router();

const todos = [
  {id: 1, name: "Bürgeramt Termin", completed: false},
  {id: 2, name: "Clean", completed: false}
];

router.get("/", (req, res) => {
  res.json(todos)
});

router.post("/", (req, res) => {
  const newTodo = req.body;
  if (!req.body.name) {
    return res.status(400).send("Missing required field: 'name'");
  }

  todos.push(newTodo);
  res.status(201).send("Todo created");
})

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex === -1) {
    res.status(404).send("Todo not found")
  } else {
    todos.splice(todoIndex, 1);
    res.send("Todo deleted");
  }
})

router.put("/:id", (req, res) => {
  const newTodo = req.body;
  const todoId = parseInt(req.params.id);

  if (!req.body.name) {
    return res.status(400).send("Request body must contain name");
  }
  
  const todoIndex = todos.findIndex(todo => todo.id === todoId);

  if (todoIndex === -1) {
    return res.status(404).send("Todo not found");
  } else {
    todos[todoIndex] = newTodo;
    res.send("Todo was updated");
  } 
})

export default router;