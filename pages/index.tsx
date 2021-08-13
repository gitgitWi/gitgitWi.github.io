import Head from "next/head";
import { MAIN_META_DESC, MAIN_TITLE } from "../constants";

export default function Home() {
  return (
    <div>
      <Head>
        <title>{MAIN_TITLE}</title>
        <meta name="description" content={MAIN_META_DESC} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{MAIN_TITLE}</h1>
      </main>
    </div>
  );
}
