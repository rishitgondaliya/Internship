import { Fragment } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";

export default function FilteredEventPage() {
  const router = useRouter();
  const slug = router.query.slug;
  if (!slug) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = +slug[0];
  const filteredMonth = +slug[1];

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 21 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid year or month, please select valid params</p>
        </ErrorAlert>
      </Fragment>
    );
  }

  const events = getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

  if (!events || events.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No matching events found!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(filteredYear, filteredMonth - 1);

  return (
    <Fragment>
      <h1 className="center">Filtered Events</h1>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </Fragment>
  );
}
