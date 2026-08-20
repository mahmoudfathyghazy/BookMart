import { useState } from "react";
import { FavoritesContext } from "./favorites-context";

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

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
