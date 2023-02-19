import '../src/App.css';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Schronisko</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}