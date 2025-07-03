import EventList from "../components/events/event-list";
import getFeatureEvents from "../dummy-data.js";

export default function HomePage() {
  const featuredEvents = getFeatureEvents();
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}
