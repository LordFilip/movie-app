import { useState, useEffect } from 'react'

const useFetchMovies = (titles) => {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const key = '' // Replace with your actual API key
  const cacheKey = 'cachedMovies' // Key for local storage
  const cacheExpiryKey = 'cacheExpiry' // Key for cache expiry timestamp

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      setError(null)

      // Check local storage for cached data and expiry
      const cachedMovies = localStorage.getItem(cacheKey)
      const cacheExpiry = localStorage.getItem(cacheExpiryKey)

      const cacheIsValid =
        cachedMovies &&
        cacheExpiry &&
        new Date().getTime() < parseInt(cacheExpiry)

      if (cacheIsValid) {
        setMovies(JSON.parse(cachedMovies))
        setLoading(false)
        return
      }

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
          // Save to local storage with a new expiry timestamp
          localStorage.setItem(cacheKey, JSON.stringify(data))
          localStorage.setItem(
            cacheExpiryKey,
            (new Date().getTime() + 3600000).toString() // Cache for 1 hour
          )
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
  }, [titles]) // Re-run the effect whenever titles change

  return { movies, error, loading }
}

export default useFetchMovies
