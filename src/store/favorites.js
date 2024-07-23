import create from 'zustand'

const useFavoritesStore = create((set) => ({
  favorites: [],
  addToFavorites: (movie) =>
    set((state) => ({ favorites: [...state.favorites, movie] })),
  removeFromFavorites: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((movie) => movie.id !== id),
    })),
}))

export default useFavoritesStore
