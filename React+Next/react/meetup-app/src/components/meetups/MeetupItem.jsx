import classes from "./MeetupItem.module.css";
import Card from "../ui/card";
import { useContext } from "react";
import FavoritesContext from "../../store/favourites-context";

export default function MeetupItem(props) {
  const favContext = useContext(FavoritesContext);
  const isFav = favContext.isFavorite(props.id);

  function toggleFavStatusHandler() {
    if (isFav) {
      favContext.removeFavorite(props.id);
    } else {
      favContext.addFavorite({
        id: props.id,
        title: props.title,
        image: props.image,
        description: props.description,
        address: props.address,
      });
    }
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavStatusHandler}>
            {isFav ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </Card>
    </li>
  );
}
