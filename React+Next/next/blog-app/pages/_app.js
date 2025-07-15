import Head from "next/head";

import "../styles/globals.css";
import { Fragment } from "react";
import Layout from "../components/layout/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Fragment>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </Fragment>
    </Layout>
  );
}

export default MyApp;
