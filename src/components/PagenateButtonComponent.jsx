function ButtonsPoginationComponent({ setPage, page }) {
  return (
    <>
      <div
      //    className={style.ButtonsPogination}
      >
        <button
          //   className={style.BtnPogination}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          {" "}
          назад{" "}
        </button>
        <button
          //   className={style.BtnPogination}
          disabled={page === 5}
          onClick={() => setPage(page + 1)}
        >
          {" "}
          вперед
        </button>
      </div>
    </>
  );
}

export default ButtonsPoginationComponent;
