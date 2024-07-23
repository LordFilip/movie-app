// Components/Navbar.js
import { Link } from 'react-router-dom'
import styles from './HomePageComponents/HomePage.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="top-movies" className={styles.navLink}>
            Top Movies
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="search" className={styles.navLink}>
            Search
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="favourites" className={styles.navLink}>
            Favourites
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
