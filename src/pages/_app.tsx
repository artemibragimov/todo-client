import {AppProps} from 'next/dist/shared/lib/router/router';
import React from 'react';
import Head from 'next/head';
import {Header} from '../components/header/Header';
import '../styles/global.css';

const MyApp = ({Component, pageProps}: AppProps): JSX.Element => {
    return (
        <>
            <Head>
                <title>To-Do</title>
            </Head>
            <Header/>
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;