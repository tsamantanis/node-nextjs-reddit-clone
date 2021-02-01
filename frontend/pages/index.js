import Layout from '../components/Layout'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <Layout>
            <div className={styles.container}>
                <Head>
                    <title>Reddit.js</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Reddit.js
                    </h1>
                </main>
            </div>
        </Layout>
    )
}
