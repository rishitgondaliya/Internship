import { useRouter } from "next/router";

export default function CLientsProjectPage() {
  const router = useRouter();
  console.log(router.pathname);
  console.log(router.query);
  function loadProjecthandler() {
    // router.push("/clients/rishit/project-a");
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: { id: "rishit", clientprojectid: "project-a" },
    });
  }
  return (
    <div>
      <h1>The projects of a given client</h1>
      <button onClick={loadProjecthandler}>Load Project 'A'</button>
    </div>
  );
}
