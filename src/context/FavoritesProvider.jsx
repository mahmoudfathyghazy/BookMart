import { useEffect, useState } from "react";
import { FavoritesContext } from "./FavoritesContext";

const FAV_KEY = "bookmart:favorites";

/** Restores favorites saved by a previous session (may be null). */
function readStoredFavorites() {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    if (!raw) return { ids: [], products: [] };
    const parsed = JSON.parse(raw);
    return {
      ids: Array.isArray(parsed.ids) ? parsed.ids : [],
      products: Array.isArray(parsed.products) ? parsed.products : [],
    };
  } catch {
    return { ids: [], products: [] };
  }
}

export function FavoritesProvider({ children }) {
  const stored = readStoredFavorites();
  const [favoriteIds, setFavoriteIds] = useState(stored.ids);
  const [favoriteProducts, setFavoriteProducts] = useState(stored.products);

  // Mirror favorites to localStorage so a refresh keeps them.
  useEffect(() => {
    try {
      localStorage.setItem(
        FAV_KEY,
        JSON.stringify({ ids: favoriteIds, products: favoriteProducts })
      );
    } catch {
      // storage unavailable -> favorites simply not persisted
    }
  }, [favoriteIds, favoriteProducts]);

  const isFavorite = (id) => favoriteIds.includes(id);

  const toggleFavorite = (product) => {
    setFavoriteIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((favId) => favId !== product.id)
        : [...prev, product.id]
    );
    setFavoriteProducts((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );
  };

  const value = { favoriteIds, favoriteProducts, isFavorite, toggleFavorite };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
