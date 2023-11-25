import React,{Fragment} from "react";
//components
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
const Finallist=() => {
    return (
      <Fragment>
        <div className="container">
        <InputTodo />
        <ListTodos />
        </div>
        </Fragment>
    );
  };
  
  export default Finallist;