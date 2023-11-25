// ListTodos.jsx

import React, { Fragment, useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";


const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  const [userName, setUserName] = useState("");

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:3500/todos/${id}`, {
        method: "DELETE",
      });
      console.log(deleteTodo);
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:3500/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const toggleTodo = async (id, completed, createdAt) => {
    try {
      const fiveMinutesAgo = new Date();
      fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 1);
  
      // If the todo was created more than 5 minutes ago, reset completion status
      if (new Date(createdAt) < fiveMinutesAgo) {
        const response = await fetch(`http://localhost:3500/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: false, userName }),
        });
  
        const updatedTodo = await response.json();
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.todo_id === updatedTodo.todo_id ? updatedTodo : todo
          )
        );
      } else {
        // Otherwise, toggle completion status
        const response = await fetch(`http://localhost:3500/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: !completed, userName }),
        });
  
        const updatedTodo = await response.json();
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.todo_id === updatedTodo.todo_id ? updatedTodo : todo
          )
        );
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <table className="table table-hover mt-5 text-center">
        <thead>
          <tr>
            <th>Checked</th>
            <th>Description</th>
            <th>User Name</th>
            <th>Assigned At</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.todo_id, todo.completed)}
                />
              </td>
              <td className={todo.completed ? "completed" : ""}>
                {`${todo.userName ? `${todo.userName}: ` : ""}${todo.description}`}
              </td>
              <td>{todo.user_name}</td>
              <td>{new Date(todo.created_at).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
