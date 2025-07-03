import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import ArrowIcon from "../icons/arrow-right-icon";
import AddressIcon from "../icons/address-icon";
import classes from "./event-item.module.css";

export default function EventItem(props) {
  const { title, image, date, location, id } = props;

  const formatedDate = new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // const formatedAddress = location.replace(", ", "\n");
  const link = `/events/${id}`;
  return (
    <li className={classes.item}>
      <img src={"/" + image} alt={""} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{formatedDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formatedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={link}>
            <span>Explore event</span>{" "}
            <span className={classes.icon}>
              <ArrowIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}
