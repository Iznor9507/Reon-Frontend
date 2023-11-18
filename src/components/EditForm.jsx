function EditForm({ handleSetText, handleChangeButton }) {

  return (
    <form onSubmit={handleChangeButton}>
      <input onChange={handleSetText}></input>
    </form>
  );
}

export default EditForm;
