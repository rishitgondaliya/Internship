import EventList from "../components/events/event-list";
import getFeatureEvents from "../dummy-data.js";

export default function HomePage() {
  const featuredEvents = getFeatureEvents();
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Featured events</h1>
      <EventList items={featuredEvents} />
    </div>
  );
}
