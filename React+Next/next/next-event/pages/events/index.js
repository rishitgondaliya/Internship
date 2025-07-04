import { useRouter } from "next/router";
import { Fragment } from "react";

import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";

export default function AllEventsPage() {
  const events = getAllEvents();
  const router = useRouter();

  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventSearch onSearchEvent={findEventHandler} />
      <h1 style={{ textAlign: "center" }}>All events</h1>
      <EventList items={events} />
    </Fragment>
  );
}
