import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";

export default function AllEventsPage(props) {
  const events = props.events;
  const router = useRouter();

  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Find great events" />
      </Head>
      <EventSearch onSearchEvent={findEventHandler} />
      <h1 style={{ textAlign: "center" }}>All events</h1>
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps(params) {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}
