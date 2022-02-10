import Head from 'next/head';
import { MAIN_META_DESC, MAIN_TITLE } from '@/constants/index';
import { TitleTexts } from '@/components/molecules';

export default function Home() {
  return (
    <div>
      <Head>
        <title>{MAIN_TITLE}</title>
        <meta name="description" content={MAIN_META_DESC} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TitleTexts titleText={MAIN_TITLE} />
      </main>
    </div>
  );
}
