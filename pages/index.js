import Head from 'next/head'
import styles from '../styles/Home.module.css'

import useSWR from 'swr'
import axios from 'axios'

const fetcher = async url => {

    // url = 'http://localhost:8000/api/v1/';
    // url = 'https://swapi.dev/api/starships/9';
    // url = 'https://drf-snacks-api.herokuapp.com/api/v1/snacks/'

    // url = 'http://localhost:8000/api/v1/snacks/'

    // const response = await fetch(url);

    // const data = await response.json();

    // console.log(data);


    const tokenUrl = 'http://localhost:8000/api/token/';

    const authResponse = await axios.post(tokenUrl,{
        username:'jb',
        password:'jb'
    });

    const token = authResponse.data;

    console.log('token', token);

    const config = {
        headers: { Authorization: `Bearer ${token.access}` }
    };

    const response = await axios.get(url, config);

    console.log(response.data);

    return response.data;
}


export default function Home() {

    const apiUrl = 'http://localhost:8000/api/v1/snacks/';

    const { data, error } = useSWR(apiUrl, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
        <div className={styles.container}>
            <Head>
                <title>Full Stack Snacks</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Full Stack Snacks
                </h1>
                <h2>{data.length}</h2>
                <ul>
                {data.map(snack => {
                  return <li key={snack.id}>{snack.name}</li>
                })}
                </ul>

            </main>
        </div>
    )
}