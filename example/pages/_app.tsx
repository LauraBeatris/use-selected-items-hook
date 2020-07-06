import Head from "next/head";
import { NextPage } from "next";
import { AppProps } from "next/app";

import "./styles.scss";

const App: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>useSelectedItems</title>
    </Head>
    <Component {...pageProps} />
  </>
);

export default App;
