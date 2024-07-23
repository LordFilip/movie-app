import React from 'react'
import styles from '../TopMovies.module.css'

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  startPage,
  endPage,
}) => {
  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={styles.paginationButton}
      >
        First
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.paginationButton}
      >
        Previous
      </button>
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <button
          key={startPage + index}
          onClick={() => onPageChange(startPage + index)}
          className={`${styles.paginationButton} ${
            currentPage === startPage + index ? styles.activePage : ''
          }`}
        >
          {startPage + index}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.paginationButton}
      >
        Next
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={styles.paginationButton}
      >
        Last
      </button>
    </div>
  )
}

export default Pagination
