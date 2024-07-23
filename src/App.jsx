// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import TopMovies from './components/HomePageComponents/TopMovies'
import Search from './components/HomePageComponents/Search'
import Favorites from './components/HomePageComponents/Favorites'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<HomePage />}>
          <Route path="top-movies" element={<TopMovies />} />
          <Route path="search" element={<Search />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
