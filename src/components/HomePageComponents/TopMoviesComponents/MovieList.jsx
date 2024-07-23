import styles from '../TopMovies.module.css'

// eslint-disable-next-line react/prop-types
const MovieList = ({ movies, onMovieClick }) => {
  return (
    <ul className={styles.movieList}>
      {movies.map((movie) => (
        <li
          key={movie.imdbID}
          className={styles.movieItem}
          onClick={() => onMovieClick(movie)}
        >
          <div className={styles.contentWrapper}>
            <h2 className={styles.movieTitle}>{movie.Title}</h2>
            <div className={styles.header}>
              <p className={styles.movieYear}>{movie.Year}</p>
              <p className={styles.movieGenre}>{movie.Genre}</p>
            </div>
            <img
              src={movie.Poster}
              alt={movie.Title}
              className={styles.moviePoster}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default MovieList
