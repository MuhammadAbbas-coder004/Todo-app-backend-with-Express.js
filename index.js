import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Todo Array
let todo = [
  { id: 1, title: "Hello World one", description: "Lorem Ipsum one " },

];

// Root Route
app.get("/", (req, res) => {
  console.log("Root route accessed");
  res.status(200).json({
    message: "My First API is Running !!!",
    todos: todo
  });
});

// All Todos
app.get("/todos", (req, res) => {
  console.log("GET /todos called");
  console.log(todo); 
  res.status(200).json({
    success: true,
    data: todo
  });
});

// Add New Todo
app.post("/todo", (req, res) => {
  console.log("POST /todo called", req.body);
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title & Description required!"
    });
  }

  const newTodo = {
    id: Date.now(),
    title,
    description
  };

  todo.push(newTodo);
  console.log("Todo added", newTodo);

  res.status(201).json({
    success: true,
    message: "Todo added!",
    data: newTodo
  });
});

// Update Todo
app.put("/todo/:id", (req, res) => {
  console.log("PUT /todo/:id called", req.params, req.body);
  const { id } = req.params;
  const { title, description } = req.body;

  const index = todo.findIndex(item => item.id == id);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Todo not found!"
    });
  }

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title & Description required!"
    });
  }

  todo[index].title = title;
  todo[index].description = description;

  console.log("Todo updated", todo[index]);

  res.status(200).json({
    success: true,
    message: "Todo updated!",
    data: todo[index]
  });
});

// Delete Todo
app.delete("/todo/:id", (req, res) => {
  console.log("DELETE /todo/:id called", req.params);
  const { id } = req.params;
  const index = todo.findIndex(item => item.id == id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Todo not found!"
    });
  }

  const deletedTodo = todo.splice(index, 1);
  console.log("Todo deleted", deletedTodo[0]);

  res.status(200).json({
    success: true,
    message: "Todo deleted!",
    data: deletedTodo[0],
    remainingTodos: todo.length
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
