import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

export default function ProductDeTail(props) {
  const { product } = props;

  if (!product) {
    return <h1>Loading...</h1>; // use when using fallback: true, don't need when fallback : 'blocking'
  }

  return (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pId;
  const data = await getData();

  const product = data.products.find((p) => p.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: product,
    },
  };
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

// to generate dynamic page paths
// tells which concreate instances of this dynamic path must be pre-generated
export async function getStaticPaths(params) {
  const data = await getData();
  const ids = data.products.map((p) => p.id);
  const pathWithParams = ids.map((id) => ({ params: { pId: id } }));
  return {
    // paths: [
    // { params: { pId: "p1" } },
    //   { params: { pId: "p2" } },
    //   { params: { pId: "p3" } },
    // ],
    paths: pathWithParams,
    fallback: true, // tell nextjs  pages are not listed here, they should be loaded on demand and not be pre-generated
  };
}
