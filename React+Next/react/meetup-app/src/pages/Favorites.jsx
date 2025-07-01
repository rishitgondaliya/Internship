import { useContext } from "react";
import FavoritesContext from "../store/favourites-context";
import MeetupList from "../components/meetups/MeetupList";

export default function Favorites() {
  const favContext = useContext(FavoritesContext);
  if (favContext.totalFavorites === 0) {
    return (
      <div>
        <h1>Your Favorite meetups</h1>
        <p>You don't have any favorites yet!</p>
      </div>
    );
  }
  return (
    <section>
      <h1>Your Favorite meetups</h1>
      <MeetupList meetups={favContext.favorites} />
    </section>
  );
}
