import { Fragment } from "react";

export default function UserProfilePage(props) {
  return (
    <Fragment>
      <h1>{props.userName}</h1>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  return {
    props: {
      userName: "Rishit",
    },
  };
}
