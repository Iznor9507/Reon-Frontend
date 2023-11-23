import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo, removeTodo, addTodos } from "../features/todoSlice.js";

const useTodos = () => {
  const error = useSelector((state) => state.error);
  const todos = useSelector((state) => state.todos);

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [forceUpdate, setForceUpdate] = useState(0);

  const dispatch = useDispatch();

  const handleSetText = (e) => {
    setText(e.target.value);
  };

  const handleUpdateTodo = (id, completed) => {
    dispatch(updateTodo({ id, completed }))
      .then(() => {
        setForceUpdate((prev) => prev + 1);
      })
      .catch((error) => {
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

  return {
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
  };
};

export default useTodos;
