import { Fragment, useEffect, useState } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

async function sendData(contactDetails) {
  const response = await fetch(`/api/contact`, {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: { "Content-Type": "application/json" },
  });

  const data = response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
}

export default function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [reqStatus, setReqStatus] = useState();
  const [reqError, setReqError] = useState();

  useEffect(() => {
    if (reqStatus === "pending" || reqStatus === "error") {
      const timer = setTimeout(() => {
        setReqStatus(null);
        setReqError(null);
      }, 3000);
      // return () => clearTimeout( timer);
    }
  }, [reqStatus]);

  async function sendMessageHandler(event) {
    event.preventDefault();
    setReqStatus("pending");
    try {
      await sendData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setReqStatus("success");
      setEnteredEmail("");
      setEnteredMessage("");
      setEnteredName("");
    } catch (error) {
      setReqError(error.message);
      setReqStatus("error");
    }
  }

  let notificationData;
  if (reqStatus === "pending") {
    notificationData = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is being sending",
    };
  }

  if (reqStatus === "success") {
    notificationData = {
      status: "success",
      title: "Success",
      message: "Message sent successfully.",
    };
  }

  if (reqStatus === "error") {
    notificationData = {
      status: "error",
      title: "Error...",
      message: reqError,
    };
  }

  return (
    <Fragment>
      <section className={classes.contact}>
        <h1>How can I help you ?</h1>
        <form className={classes.form} onSubmit={sendMessageHandler}>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label htmlFor="email" id="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={enteredEmail}
                onChange={(event) => setEnteredEmail(event.target.value)}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="name" id="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={enteredName}
                onChange={(event) => setEnteredName(event.target.value)}
              />
            </div>
          </div>
          <div className={classes.control}>
            <label htmlFor="message" id="message">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              required
              value={enteredMessage}
              onChange={(event) => setEnteredMessage(event.target.value)}
            ></textarea>
          </div>
          <div className={classes.actions}>
            <button>Send Message</button>
          </div>
        </form>
      </section>
      {notificationData && (
        <Notification
          status={notificationData.status}
          title={notificationData.title}
          message={notificationData.message}
        />
      )}
    </Fragment>
  );
}
