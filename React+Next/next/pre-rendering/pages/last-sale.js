import { useEffect, useState } from "react";
import useSWR from "swr"; // react hook for fetching data

export default function LastSalePage(props) {
  const [salesState, setSalesState] = useState(props.sales);
  // const [loadingState, setLoadingState] = useState(false);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "https://react-6c4c6-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const sales = [];
      for (const key in data) {
        sales.push({
          id: key,
          userName: data[key].userName,
          volume: data[key].volume,
        });
      }
      setSalesState(sales);
    }
  }, [data]);

  if (error) {
    return <h1>Something went wrong...</h1>;
  }

  if (!salesState && !data) {
    return <h1>Loading...</h1>;
  }

  return (
    <ul>
      {salesState.map((sale) => (
        <li key={sale.id}>
          {sale.userName} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(params) {
  const response = await fetch(
    "https://react-6c4c6-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const sales = [];
  {
    for (const key in data) {
      sales.push({
        id: key,
        userName: data[key].userName,
        volume: data[key].volume,
      });
    }
  }
  return { props: { sales: sales }, revalidate: 10 };
}
