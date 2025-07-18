import { useRef } from "react";
import classes from "./profile-form.module.css";

export default function ProfileForm(props) {
  const oldPassRef = useRef();
  const newPassRef = useRef();
  function submitFormHandler(e) {
    e.preventDefault();
    const enteredOldPass = oldPassRef.current.value;
    const enteredNewPass = newPassRef.current.value;

    props.onChangePassword(enteredOldPass, enteredNewPass);
  }
  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPassRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPassRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}
