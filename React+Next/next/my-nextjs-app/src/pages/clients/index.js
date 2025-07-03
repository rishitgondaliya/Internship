import Link from "next/link";

export default function ClientsPage() {
  const clients = [
    { id: "rishit", name: "Rishit" },
    { id: "max", name: "Maxi" },
  ];
  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        {clients.map((c) => (
          <li key={c.id}>
            {/* <Link href={`/clients/${c.id}`}>{c.name}</Link> */}
            <Link
              href={{
                pathname: "/clients/[id]",
                query: { id: c.id },
              }}
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
