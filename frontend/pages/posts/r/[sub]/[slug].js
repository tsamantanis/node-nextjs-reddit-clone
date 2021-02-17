import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../../../components/Layout'
import NewComment from '../../../../components/Comments/NewComment'
import CommentList from '../../../../components/Comments/CommentList'
import styles from '../../../../styles/Home.module.css'

function Post({ post }) {
    const router = useRouter()
    return (
        <Layout>
            <Head>
                <title>{`Reddit.js | ${post.subreddit} | ${post.title}`}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="col-12 post">
                <div className={styles.card}>
                    <span className={styles.subredditText}>{ `/r/${post.subreddit} - ${post.author ? post.author.username : "anonymous"}` }</span>
                    <h2>{ post.title }</h2>
                    <p>{ post.summary }</p>
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
        const paths = posts.map((post) => `/posts/r/${post.subreddit}/${post.slug}`)
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
