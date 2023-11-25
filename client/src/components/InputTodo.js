import React, { Fragment, useState } from "react";
import "./ListTodos.css"; 
const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();

    // Check if description is empty
    if (!description.trim()) {
      alert("Please enter a task before adding.");
      return;
    }

    try {
      const body = { description };
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
      <h1 className="test-center mt-5">TODO-List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your task here!"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success btn-md stylish-button">Add </button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
