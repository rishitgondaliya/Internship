import Button from "../ui/button";
import classes from "./results-title.module.css";

export default function ResultsTitle(props) {
  const { date } = props;

  const formatedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.title}>
      <h1>Events in {formatedDate}</h1>
      <Button link={"/events"}>All Events</Button>
    </section>
  );
}
