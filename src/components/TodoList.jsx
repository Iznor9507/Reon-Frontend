import "./styles/todoListComponentStyles.css";
import { useEffect, useState } from "react";
import Modal from "./Modal";
function TodoList({ data, handleUpdateTodo, handleRemoveTodo }) {
  const [activeText, setActiveText] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleShowInput = (task) => {
    setActiveText((prev) => !prev);
    setSelectedTask(task);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Фильтрация данных на основе введенного термина
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
  };

  if (!data) {
    return <h1>Произошла ощибка с получением списка дел:(</h1>;
  }

  return (
    <>
      <div className="todoStyle">
        <ul style={{ marginTop: "50px" }}>
          <p style={{ fontSize: "20px" }}>Ваш список дел</p>
          <input
            className="liveSearch"
            type="text"
            placeholder="Поиск по заголовку"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="list">
            {filteredData
              .map((item) => {
                return (
                  <li
                    style={{
                      listStyleType: "none",
                      width: "380px",
                      height: "60px",
                      marginBottom: "10px",
                      border: "1px solid black",
                    }}
                    key={item._id}
                  >
                    <div style={{ display: "flex" }}>
                      <button
                        className="active_window"
                        style={{ width: "80px" }}
                        onClick={() => handleShowInput(item)}
                      >
                        Показать полность
                      </button>
                      <div className="titleAndText">
                        <h2
                          className={item.completed ? "title active" : "title"}
                        >
                          {item.title}
                        </h2>
                        {activeText && (
                          <Modal
                            setActiveText={setActiveText}
                            activeText={activeText}
                            selectedTask={selectedTask}
                          />
                        )}
                      </div>
                      <div className="deleteAndCompleted">
                        <button
                          onClick={() =>
                            handleUpdateTodo(item._id, item.completed)
                          }
                          className="completed"
                        >
                          ✔
                        </button>
                        <button
                          className="buttonDelete"
                          onClick={() =>
                            handleRemoveTodo(item._id, filteredData)
                          }
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </li>
                );
              }) // reverse() переворачивает массив
              .reverse()}
          </div>
        </ul>
      </div>
    </>
  );
}

export default TodoList;
