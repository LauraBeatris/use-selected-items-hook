import Head from "next/head";
import { NextPage } from "next";
import { AppProps } from "next/app";

import "../styles/index.css";

const App: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => (
  <div>
    <Head>
      <title>useSelectedItems</title>
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>

    <div className="sm:py-8 min-h-screen w-screen overflow-y-hidden bg-indigo-200">
      <div
        className="bg-white mx-auto overflow-hidden shadow-xl sm:rounded overflow-y-auto"
        style={{ maxWidth: "375px" }}
      >
        <Component {...pageProps} />
      </div>
    </div>
  </div>
);

export default App;
