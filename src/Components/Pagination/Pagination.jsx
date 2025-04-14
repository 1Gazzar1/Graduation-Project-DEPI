import styles from "../Pagination/Pagination.module.css";
function Pagination({ prevPage, nextPage, page }) {
  return (
    <div className={styles.container}>
      <button className={styles.arrow} onClick={prevPage}>
        ⬅️
      </button>
      <h3 className={styles.h3}>{page}</h3>
      <button className={styles.arrow} onClick={nextPage}>
        ➡️
      </button>
    </div>
  );
}

export default Pagination;
