import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

export default function AllMeetup() {
  const [loading, setLoading] = useState(true);
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://react-6c4c6-default-rtdb.firebaseio.com/meetups.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meetups = [];
        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };
          meetups.push(meetup);
        }
        setLoading(false);
        setMeetups(meetups);
      });
  }, []); // [empty] => will executed only once when component is rendered
  if (loading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  } else {
    return (
      <section>
        <h1>All meetups</h1>
        <MeetupList meetups={meetups} />
      </section>
    );
  }
}
