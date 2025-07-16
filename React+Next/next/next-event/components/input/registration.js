import { useContext, useRef } from "react";
import classes from "./registration.module.css";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const emailRef = useRef();

  const notificationContext = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;

    notificationContext.showNotification({
      title: "Signing in...",
      message: "Registering for news letter",
      status: "pending",
    });

    fetch("/api/newsLetter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) =>
        notificationContext.showNotification({
          title: "Sign up succeeded",
          message: "Registered for news letter successfully",
          status: "success",
        })
      )
      .catch((error) => {
        notificationContext.showNotification({
          title: "Error",
          message: error.message || "Something went wrong",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
