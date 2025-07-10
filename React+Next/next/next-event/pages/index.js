import Head from "next/head";

import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";

export default function HomePage(props) {
  return (
    <div>
      <Head>
        <title>nextEvents</title>
        <meta name="description" content="Find great events" />
      </Head>
      <h1 style={{ textAlign: "center" }}>Featured events</h1>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
