import "./styles/modalComponentStyles.css";
function Modal({ setActiveText, activeText, selectedTask }) {
  return (
    <div
      onClick={() => setActiveText(false)}
      className={activeText ? "modal active" : "modal"}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={activeText ? "modal_content active" : "modal_content"}
      >
        <h2>{selectedTask.title}</h2>
        <p className="text">
          {selectedTask.text} {selectedTask.completed}
        </p>
      </div>
    </div>
  );
}

export default Modal;
