const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body


const port = process.env.PORT || 3500;

//ROUTES//

//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { user_name, description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (user_name, description) VALUES($1, $2) RETURNING *",
      [user_name, description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update a todo's completion status
// Update a todo's completion status
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const updateTodo = await pool.query(
      'UPDATE todo SET completed = $1 WHERE todo_id = $2 RETURNING *',
      [completed, id]
    );

    const updatedTodo = updateTodo.rows[0];

    // Check if a week has passed since the todo was created
    //const oneWeekAgo = new Date();
    //oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const fiveMinutesAgo = new Date();
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

    //if (new Date(updatedTodo.created_at) < oneWeekAgo) 
    if (new Date(updatedTodo.created_at) < fiveMinutesAgo)
    {
      // Reset completed to false and update created_at to the current timestamp
      const resetTodo = await pool.query(
        'UPDATE todo SET completed = $1, created_at = CURRENT_TIMESTAMP WHERE todo_id = $2 RETURNING *',
        [false, id]
      );

      res.json(resetTodo.rows[0]);
    } else {
      res.json(updatedTodo);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});




//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(port, () => {
  console.log("server has started on port "+ port);
});