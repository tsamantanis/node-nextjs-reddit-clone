import Layout from '../components/Layout'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <Layout>
            <Head>
                <title>Reddit.js</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="row bg-primary">
                <div className="col-12">
                    <h1 className={styles.title}>
                        Reddit.js
                    </h1>
                </div>
            </div>
        </Layout>
    )
}
