import { Link } from "react-router-dom";
import { useContext } from "react";
import classes from "./MainNavigation.module.css";
import FavoritesContext from "../../store/favourites-context";

export default function MainNavigation() {
  const favContext = useContext(FavoritesContext);
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>All Meetups</Link>
          </li>
          <li>
            <Link to={"/new-meetup"}>New Meetup</Link>
          </li>
          <li>
            <Link to={"/favorites"}>
              My Favorites{" "}
              <span className={classes.badge}>{favContext.totalFavorites}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
