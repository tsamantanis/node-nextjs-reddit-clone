import axios from 'axios'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import styles from '../../styles/Home.module.css'

function Posts() {
    const [posts, setPosts] = useState([])
    useEffect(() => loadPosts(), [])

    async function loadPosts() {
        const res = await axios.get(process.env.NEXT_APP_URI + '/posts')
        setPosts(res.data.posts)
    }

    return (
        <Layout>
            {posts.map((post) => {
                return (
                    <Link href={`/posts/r/${post.subreddit}/${post.slug}`}>
                        <div className="col-12 posts">
                            <div className={styles.card}>
                                <span className={styles.subredditText}>{ `/r/${post.subreddit}` }</span>
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

export default Posts
