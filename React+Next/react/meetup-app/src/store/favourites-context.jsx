/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favMeetup) => {},
  removeFavorite: (meetupId) => {},
  isFavorite: (meetupId) => {},
});

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);

  function addFavoriteHandler(newFavorite) {
    setUserFavorites((prevFavorites) => {
      return prevFavorites.concat(newFavorite);
    });
  }

  function removeFavoriteHandler(meetupId) {
    setUserFavorites((prevFavorites) => {
      return prevFavorites.filter((meetup) => meetup.id !== meetupId);
    });
  }

  function isItemFavoriteHandler(meetupId) {
    return userFavorites.some((meetup) => meetup.id === meetupId);
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    isFavorite: isItemFavoriteHandler,
  };
  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
