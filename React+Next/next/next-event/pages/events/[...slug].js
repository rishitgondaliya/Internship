import Head from "next/head";
import { Fragment } from "react";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";

export default function FilteredEventPage(props) {
  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid year or month, please select valid params</p>
        </ErrorAlert>
      </Fragment>
    );
  }

  const events = props.events;

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

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      <Head>
        <title>Filtered events</title>
        <meta
          name="description"
          content={`All events for ${filteredMonth}/${filteredYear}`}
        />
      </Head>
      <h1 className="center">Filtered Events</h1>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const filteredYear = +params.slug[0];
  const filteredMonth = +params.slug[1];

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 21 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return { props: { hasError: true }, notFound: true };
  }

  const events = await getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

  return {
    props: {
      events: events,
      date: {
        year: filteredYear,
        month: filteredMonth,
      },
    },
  };
}
