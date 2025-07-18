import { useRef, useState } from "react";
import { signIn } from "next-auth/react";

import classes from "./auth-form.module.css";
import { useRouter } from "next/router";

async function createNewUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export default function AuthForm() {
  const [isLogInMode, setIsLogInMode] = useState();
  const router = useRouter();

  const emailRef = useRef();
  const passRef = useRef();

  function switchAuthModeHandler() {
    setIsLogInMode((prevState) => !prevState);
  }

  async function submitFormHandler(e) {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPass = passRef.current.value;
    if (isLogInMode) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPass,
      });

      if (!result.error) {
        router.replace("/profile");
      }
    } else {
      try {
        const user = await createNewUser(enteredEmail, enteredPass);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogInMode ? "Login" : "Sign Up"}</h1>
      <form className={classes.control} onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="emial" ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            ref={passRef}
            required
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogInMode ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogInMode ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}
