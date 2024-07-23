// hooks/useFetchMovies.js
import { useState, useEffect } from 'react'

const useFetchMovies = (titles) => {
  const [movies, setMovies] = useState([]) // State to store movie data
  const [error, setError] = useState(null) // State to store error if any
  const [loading, setLoading] = useState(true) // State to handle loading state

  const key = '' // Replace with your actual API key

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      setError(null)

      try {
        const requests = titles.map((title) =>
          fetch(
            `http://www.omdbapi.com/?t=${encodeURIComponent(
              title
            )}&apikey=${key}`
          )
        )

        const responses = await Promise.all(requests)
        const data = await Promise.all(responses.map((res) => res.json()))

        if (data.every((movie) => movie.Response === 'True')) {
          setMovies(data)
        } else {
          setError('Some movies could not be fetched.')
        }
      } catch (error) {
        setError('Error fetching data: ' + error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [titles])

  return { movies, error, loading }
}

export default useFetchMovies
