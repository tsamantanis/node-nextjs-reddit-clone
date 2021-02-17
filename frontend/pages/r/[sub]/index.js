import axios from 'axios'
import { useRouter } from "next/router";
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../../../components/Layout'
import styles from '../../../styles/Home.module.css'

function Subreddit() {
    const router = useRouter();
    const { sub } = router.query;
    const [posts, setPosts] = useState([])
    useEffect(() => loadPosts(), [])

    async function loadPosts() {
        const res = await axios.get(process.env.NEXT_APP_URI + '/r/' + sub)
        setPosts(res.data.posts)
    }

    return (
        <Layout>
            {posts && posts.map((post) => {
                return (
                    <Link href={`/r/${post.subreddit}/${post.slug}`}>
                        <div className="col-12">
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

export default Subreddit
