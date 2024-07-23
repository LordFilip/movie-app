import styles from '../TopMovies.module.css'

const TopControls = ({
  showAll,
  onToggleView,
  selectedGenre,
  onGenreChange,
}) => {
  return (
    <div className={styles.topControls}>
      <h1 className={styles.title}>Top 100 Movies</h1>
      <button onClick={onToggleView} className={styles.toggleButton}>
        {showAll ? 'Show Paginated' : 'Show All'}
      </button>
    </div>
  )
}

export default TopControls
