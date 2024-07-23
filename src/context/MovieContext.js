// context/MovieContext.js
import { createContext, useState, useContext } from 'react'

// Create a context with default values
const MovieContext = createContext({
  moviesontext: [],
  setMoviesContext: () => {},
  favorites: [],
  addFavorite: () => {},
})

// Create a provider component
// eslint-disable-next-line react/prop-types
export const MovieProvider = ({ children }) => {
  const [moviesContext, setMoviesContext] = useState([])
  const [favorites, setFavorites] = useState([])

  const addFavorite = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie])
  }

  return (
    <MovieContext.Provider
      value={{ moviesContext, setMoviesContext, favorites, addFavorite }}
    >
      {children}
    </MovieContext.Provider>
  )
}

// Custom hook to use the MovieContext
export const useMovieContext = () => useContext(MovieContext)
