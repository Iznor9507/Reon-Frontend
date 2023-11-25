import { useEffect, useState } from "react";
import useTodos from "../myHooks/useTodos";
import InputComponent from "./InputComponent";
import "./style.css";

import TodoList from "./TodoList";
import { useDispatch } from "react-redux";
import { fetchTodos, updateTodo } from "../features/todoSlice";
import ButtonsPoginationComponent from "./PagenateButtonComponent";
function Home() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const {
    error,
    todos,
    text,
    title,
    forceUpdate,
    handleSetText,
    handleUpdateTodo,
    handleSetTitle,
    handleRemoveTodo,
    handleChangeButton,
  } = useTodos();

  useEffect(() => {
    dispatch(fetchTodos(page));
    dispatch(updateTodo());
  }, [dispatch, forceUpdate, page]);

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
        <ButtonsPoginationComponent setPage={setPage} page={page} />
      </div>
    </>
  );
}

export default Home;
