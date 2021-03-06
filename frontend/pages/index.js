import axios from 'axios'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

export default function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() => loadPosts(), [])

    async function loadPosts() {
        const res = await axios.get(process.env.NEXT_APP_URI + '/posts', { withCredentials: true })
        setPosts(res.data.posts)
    }
    return (
        <Layout>
            {posts.map((post) => {
                return (
                    <Link href={`/r/${post.subreddit}/${post.slug}`}>
                        <div className="col-12 posts">
                            <div className={styles.card}>
                                <span className={styles.subredditText}>{ `/r/${post.subreddit} - ${post.author ? post.author.username : "anonymous"}` }</span>
                                <h3>{ post.title }</h3>
                                <p>{ post.summary.length > 100 ? post.summary.substring(0, 97) + '...' : post.summary }</p>
                            </div>
                        </div>
                    </Link>
                )}
            )}
        </Layout>
    )
}
