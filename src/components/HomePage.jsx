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

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [forceUpdate, setForceUpdate] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(updateTodo());
  }, [dispatch, forceUpdate]);

  const handleSetText = (e) => {
    setText(e.target.value);
  };
  const handleUpdateTodo = (id, completed) => {
    dispatch(updateTodo({ id, completed }))
      .then(() => {
        setForceUpdate((prev) => prev + 1); // Увеличиваем значение для принудительного обновления
      })
      .catch((error) => {
        // Обработка ошибок, если необходимо
        console.error("Failed to update todo:", error);
      });
  };

  const handleSetTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const handleChangeButton = (e) => {
    e.preventDefault();
    dispatch(addTodos({ text, title }));
    setTitle("");
    setText("");
  };

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
          forceUpdate={forceUpdate}
          handleUpdateTodo={handleUpdateTodo}
          className="todoList"
          data={todos}
          handleRemoveTodo={handleRemoveTodo}
        />
      </div>
    </>
  );
}

export default Home;
