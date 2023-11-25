import React, { Fragment, useState } from "react";
import "./ListTodos.css"; 
const InputTodo = () => {
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();

    // Check if description is empty
    if (!description.trim()) {
      alert("Please enter a task before adding.");
      return;
    }
    if (!userName.trim()) {
      alert("Please enter the user name before adding.");
      return;
    }
    try {
      const body = { user_name: userName, description };
      const response = await fetch("http://localhost:3500/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(response);
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="test-center mt-5">Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your user name"
          value={userName}
          style={{ width: '250px' }}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Enter your task here!"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-primary btn-md">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
