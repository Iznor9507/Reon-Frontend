import { useEffect, useState } from "react";
import {
  addTodos,
  fetchTodos,
  removeTodo,
  updateTodo,
} from "../features//todoSlice";

import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import InputComponent from "./InputComponent";
import TodoList from "./TodoList";
function Home() {
  const error = useSelector((state) => state.error);
  const todos = useSelector((state) => state.todos);
  const loading = useSelector((state) => state.loading);

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSetText = (e) => {
    setText(e.target.value);
  };

  const handleSetTitle = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(updateTodo());
  }, [dispatch]);

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const handleChangeButton = (e) => {
    e.preventDefault();
    dispatch(addTodos({ text, title }));
    setTitle("");
    setText("");
  };

  if (loading) {
    return <h1>ЗАГРУЗКА</h1>;
  }

  if (error) {
    <div>{error}</div>;
  }

  return (
    <>
      <div className="roditel">
        <InputComponent
          className="inputComponent"
          handleChangeButton={handleChangeButton}
          handleSetText={handleSetText}
          handleSetTitle={handleSetTitle}
          text={text}
          title={title}
        />
        <TodoList
          updateTodo={updateTodo}
          className="todoList"
          data={todos}
          handleRemoveTodo={handleRemoveTodo}
        />
      </div>
    </>
  );
}

export default Home;
