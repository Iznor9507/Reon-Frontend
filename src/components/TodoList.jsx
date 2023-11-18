import "./styles/todoListComponentStyles.css";
import { useState } from "react";
import Modal from "./Modal";
function TodoList({ data, handleRemoveTodo }) {
  const [activeText, setActiveText] = useState(false);
  const [done, setDone] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleShowInput = (task) => {
    setActiveText((prev) => !prev);
    setSelectedTask(task);
  };

  const handleCompleted = () => {
    setDone((done) => !done);
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
        <ul style={{ marginTop: "40px" }}>
          <p style={{ fontSize: "20px" }}>Ваш список дел</p>
          <input
            type="text"
            placeholder="Поиск по заголовку"
            value={searchTerm}
            onChange={handleSearch}
          />
          {filteredData
            .map((item) => {
              return (
                <li
                  style={{
                    listStyleType: "none",
                    width: "25vw",
                    height: "60px",
                    marginBottom: "20px",
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
                      <h2 className={done ? "title active" : "title"}>
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
                        onClick={() => handleCompleted(item._id)}
                        className="completed"
                      >
                        ✔
                      </button>
                      <button
                        className="buttonDelete"
                        onClick={() => handleRemoveTodo(item._id)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </li>
              );
            }) // reverse() переворачивает массив
            .reverse()}
        </ul>
      </div>
    </>
  );
}

export default TodoList;
