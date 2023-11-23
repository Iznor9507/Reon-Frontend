import "./styles/inputComponentStyles.css";
function InputComponent({
  handleChangeButton,
  text,
  title,
  handleSetTitle,
  handleSetText,
}) {
  return (
    <>
      <div>
        <form onSubmit={handleChangeButton} className="forms" type="submit">
          <input
            className="addTitleInput"
            value={title}
            onChange={handleSetTitle}
            type="text"
            placeholder="Напишите заголовок текста"
          />
          <textarea
            placeholder="Напиши текст"
            className="inputText"
            value={text}
            type="text"
            onChange={handleSetText}
          />
          <button
            className="btnAdd"
            disabled={!text || text[0] === " " || !title || title[0] === " "}
          >
            Добавить
          </button>
        </form>
      </div>
    </>
  );
}

export default InputComponent;
