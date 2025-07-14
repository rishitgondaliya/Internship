import { Fragment, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

export default function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();
  function loadFeedbackHandler(fId) {
    fetch(`/api/${fId}`)
      .then((res) => res.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }
  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}{" "}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Deatils
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}
