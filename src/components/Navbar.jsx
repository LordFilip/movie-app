import { useState, useEffect } from 'react'
import styles from './HomePageComponents/HomePage.module.css'

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
  }

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === '') {
        setSearchResults([])
        return
      }

      setLoading(true)
      try {
        // Simulate fetching data (replace with your actual API call or search logic)
        const response = await fetch(`/api/search?query=${searchQuery}`)
        const data = await response.json()
        setSearchResults(data)
      } catch (error) {
        console.error('Error fetching search results:', error)
      } finally {
        setLoading(false)
      }
    }

    const debounceFetch = setTimeout(fetchSearchResults, 300) // Debounce to reduce API calls

    return () => clearTimeout(debounceFetch)
  }, [searchQuery])

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a href="top-movies" className={styles.navLink}>
            Top Movies
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="favorites" className={styles.navLink}>
            Favourites
          </a>
        </li>
      </ul>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        {loading && <p className={styles.loading}>Loading...</p>}
        {searchResults.length > 0 && (
          <ul className={styles.searchResults}>
            {searchResults.map((result) => (
              <li key={result.id} className={styles.searchResultItem}>
                {result.title}
              </li>
            ))}
          </ul>
        )}
        {searchQuery && searchResults.length === 0 && !loading && (
          <p className={styles.noResults}>No results found</p>
        )}
      </div>
    </nav>
  )
}

export default Navbar
