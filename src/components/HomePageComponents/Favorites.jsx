// components/Favorites.js
import useFavoritesStore from '../../store/favorites' // Adjust the path as necessary
import styles from './Favorites.module.css' // Import CSS module

const Favorites = () => {
  const favorites = useFavoritesStore((state) => state.favorites)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Favourites</h1>
      {favorites.length === 0 ? (
        <p className={styles.noFavorites}>No favorite movies yet.</p>
      ) : (
        <ul className={styles.movieList}>
          {favorites.map((movie) => (
            <li key={movie.imdbID} className={styles.movieItem}>
              <div className={styles.contentWrapper}>
                <h2 className={styles.movieTitle}>{movie.Title}</h2>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className={styles.moviePoster}
                />
                <div className={styles.details}>
                  <p>
                    <strong>Year:</strong> {movie.Year}
                  </p>
                  <p>
                    <strong>Genre:</strong> {movie.Genre}
                  </p>
                  <p>
                    <strong>Rating:</strong> {movie.imdbRating}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Favorites
