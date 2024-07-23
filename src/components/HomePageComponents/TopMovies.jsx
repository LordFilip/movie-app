import { useState, useMemo } from 'react'
import useFetchMovies from '../../composables/useFetchMovies'
import { topMoviesList } from '../../data/MovieList' // Adjust the path as necessary
import MovieModal from './MovieModal' // Adjust the path as necessary
import MovieList from './TopMoviesComponents/MovieList'
import Pagination from './TopMoviesComponents/Pagination'
import TopControls from './TopMoviesComponents/TopControls'
import styles from './TopMovies.module.css' // Import the CSS module

const TopMovies = () => {
  const { movies, error, loading } = useFetchMovies(topMoviesList)
  const [currentPage, setCurrentPage] = useState(1)
  const [showAll, setShowAll] = useState(false) // State for toggling views
  const [selectedMovie, setSelectedMovie] = useState(null) // State for selected movie
  const [selectedGenre, setSelectedGenre] = useState('All') // State for selected genre
  const moviesPerPage = 5

  // Filter movies by selected genre
  const filteredMovies = useMemo(() => {
    if (selectedGenre === 'All') return movies
    return movies.filter((movie) => movie.Genre.includes(selectedGenre))
  }, [movies, selectedGenre])

  // Calculate the index of the first and last movie for the current page
  const indexOfLastMovie = currentPage * moviesPerPage
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  )

  // Calculate total pages
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage)

  // Calculate the range of page buttons to display
  const maxButtons = 10
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2))
  let endPage = Math.min(totalPages, currentPage + Math.floor(maxButtons / 2))

  // Adjust range if there are fewer than maxButtons pages
  if (endPage - startPage + 1 < maxButtons) {
    if (startPage === 1) {
      endPage = Math.min(maxButtons, totalPages)
    } else if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - maxButtons + 1)
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const toggleView = () => {
    setShowAll(!showAll)
    setCurrentPage(1) // Reset to the first page when toggling views
  }

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value)
    setCurrentPage(1) // Reset to the first page when changing genre
  }

  const openModal = (movie) => {
    setSelectedMovie(movie)
  }

  const closeModal = () => {
    setSelectedMovie(null)
  }

  return (
    <div className={styles.container}>
      <TopControls
        showAll={showAll}
        onToggleView={toggleView}
        selectedGenre={selectedGenre}
        onGenreChange={handleGenreChange}
      />
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && (
        <>
          <MovieList
            movies={showAll ? filteredMovies : currentMovies}
            onMovieClick={openModal}
          />
          {!showAll && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              startPage={startPage}
              endPage={endPage}
            />
          )}
          {selectedMovie && (
            <MovieModal movie={selectedMovie} onClose={closeModal} />
          )}
        </>
      )}
    </div>
  )
}

export default TopMovies
