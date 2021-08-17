import { FunctionComponent } from "react";
import "../styles/globals.css";

interface MyAppProps {
  Component: FunctionComponent;
  pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
