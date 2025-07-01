import { useNavigate } from "react-router-dom";
import NewMeetupForm from "../components/meetups/NewMeetupForm";

export default function NewMeetup() {
  const navigate = useNavigate();
  function addMeetupHandler(meetupData) {
    fetch("https://react-6c4c6-default-rtdb.firebaseio.com/meetups.json", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: { "Content-Type": "Application/json" },
    }).then(() => {
      navigate("/", { replace: true });
    });
  }
  return (
    <div>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </div>
  );
}
