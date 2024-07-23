import styles from './MovieModal.module.css' // Import CSS module for styling
import useFavoritesStore from '../../store/favorites' // Adjust the path as necessary
import { useEffect } from 'react'

const MovieModal = ({ movie, onClose }) => {
  const addToFavorites = useFavoritesStore((state) => state.addToFavorites)
  const favorites = useFavoritesStore((state) => state.favorites)

  if (!movie) return null

  const handleAddToFavorites = () => {
    addToFavorites(movie)
    alert('Added to Favourites!')
  }

  useEffect(() => {
    console.log('Favorites:', favorites)
  }, [favorites])

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <div className={styles.modalBody}>
          <img
            src={movie.Poster}
            alt={movie.Title}
            className={styles.modalPoster}
          />
          <div className={styles.modalDetails}>
            <h2 className={styles.modalTitle}>{movie.Title}</h2>
            <p className={styles.modalGenreRatingYear}>
              <strong>Genre:</strong> {movie.Genre} | <strong>Rating:</strong>{' '}
              {movie.imdbRating} | <strong>Year:</strong> {movie.Year}
            </p>
            <p className={styles.modalPlot}>
              <strong>Plot:</strong> {movie.Plot}
            </p>
            <p>
              <strong>Director:</strong> {movie.Director}
            </p>
            <p>
              <strong>Actors:</strong> {movie.Actors}
            </p>
            <button
              className={styles.favouritesButton}
              onClick={handleAddToFavorites}
            >
              Add to Favourites
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal
