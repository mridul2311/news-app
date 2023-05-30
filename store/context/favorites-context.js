import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

function FavoritesContextProvider({ children }) {
  const [laterNewsIds, setLaterNewsIds] = useState([]);
  function addFavorite(id) {
    setLaterNewsIds((newsIds) => [...newsIds, id]);
  }

  function removeFavorite(id) {
    setLaterNewsIds((currentNewsIds) =>
      currentNewsIds.filter((newsId) => newsId != id)
    );
  }

  const value = {
    ids: laterNewsIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
