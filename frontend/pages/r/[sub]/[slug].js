import { useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCookies } from "react-cookie"
import Layout from '../../../components/Layout'
import NewComment from '../../../components/Comments/NewComment'
import CommentList from '../../../components/Comments/CommentList'
import styles from '../../../styles/Home.module.css'

function Post({ post }) {
    const router = useRouter()
    const [cookies, setCookie, removeCookie] = useCookies(['nToken'])
    const [voteScore, setVoteScore] = useState(post.voteScore ? post.voteScore : 0)

    async function handleUpvote() {
        try {
            const res = await axios.put(process.env.NEXT_APP_URI + '/posts/' + post._id + '/upvote', {}, { withCredentials: true })
            setVoteScore(res.data.voteScore)
        } catch (error) {
            console.log(error)
        }
    }
    async function handleDownvote() {
        try {
            const res = await axios.put(process.env.NEXT_APP_URI + '/posts/' + post._id + '/downvote', {}, { withCredentials: true })
            setVoteScore(res.data.voteScore)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(cookies)
    return (
        <Layout>
            <Head>
                <title>{`Reddit.js | ${post.subreddit} | ${post.title}`}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="col-12 post">
                <div className={styles.card}>
                    <div className="row">
                        <div className="col-2 text-center">
                            <button className="btn" onClick={ handleUpvote }>
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width="40px">
                                    <title>Arrow Up Circle</title>
                                    <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M176 249.38L256 170l80 79.38M256 181.03V342'/>
                                    <path d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z' fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32'/>
                                </svg>
                            </button>
                            <h3>{ voteScore }</h3>
                            <button className="btn" onClick={ handleDownvote }>
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width="40px">
                                    <title>Arrow Down Circle</title>
                                    <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M176 262.62L256 342l80-79.38M256 330.97V170'/>
                                    <path d='M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z' fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32'/>
                                </svg>
                            </button>
                        </div>
                        <div className="col-8">
                            <span className={styles.subredditText}>{ `/r/${post.subreddit} - ${post.author ? post.author.username : "anonymous"}` }</span>
                            <h2>{ post.title }</h2>
                            <p>{ post.summary }</p>
                        </div>
                    </div>
                    <hr />
                    <div className="row comments">
                        <CommentList
                            comments={ post.comments }
                            author={ post.author ? post.author.username : "anonymous" }
                            postId={ post._id }
                            loadPost={ () => router.replace(router.asPath) }
                        />
                    </div>
                    { post.comments && post.comments.length > 0 && <hr /> }
                    <NewComment
                        postId={ post._id }
                        loadPost={ () => router.replace(router.asPath) }
                    />
                </div>

            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    try {
        const res = await axios.get(process.env.NEXT_APP_URI + '/posts/')
        const posts = res.data.posts
        const paths = posts.map((post) => `/r/${post.subreddit}/${post.slug}`)
        return { paths, fallback: false }
    } catch (err) {
        console.log(err.message)
    }

}

export async function getStaticProps({ params }) {
    const res = await axios.get(process.env.NEXT_APP_URI + '/posts/r/'  + params.sub + '/' + params.slug, { withCredentials: true})
    const post = res.data.post
    return { props: { post }, revalidate: 1, }
}

export default Post
