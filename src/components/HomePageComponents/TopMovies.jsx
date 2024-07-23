import useFetchMovies from '../../composables/useFetchMovies'
import { topMoviesList } from '../../data/MovieList' // Adjust the path as necessary
import styles from './TopMovies.module.css' // Import the CSS module

const TopMovies = () => {
  const { movies, error, loading } = useFetchMovies(topMoviesList)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Top 100 Movies</h1>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && (
        <ul className={styles.movieList}>
          {movies.map((movie) => (
            <li key={movie.imdbID} className={styles.movieItem}>
              <div className={styles.contentWrapper}>
                <h2 className={styles.movieTitle}>{movie.Title}</h2>
                <div className={styles.header}>
                  <p className={styles.movieYear}>{movie.Year}</p>
                  <p className={styles.movieYear}>{movie.Genre}</p>
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
      )}
    </div>
  )
}

export default TopMovies
