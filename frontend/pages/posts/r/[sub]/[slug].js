import axios from 'axios'
import Layout from '../../../../components/Layout'
import NewComment from '../../../../components/Comments/NewComment'
import styles from '../../../../styles/Home.module.css'

function Post({ post }) {
    return (
        <Layout>
            <div className="col-12 post">
                <div className={styles.card}>
                    <span className={styles.subredditText}>{ `/r/${post.subreddit}` }</span>
                    <h2>{ post.title }</h2>
                    <p>{ post.summary }</p>
                    <hr />
                    <div className="comments">
                        <p>Hmm this could be a comment </p>
                    </div>
                    <hr />
                    <NewComment
                        postId={ post._id }
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
    console.log(params)
    const res = await axios.get(process.env.NEXT_APP_URI + '/posts/r/'  + params.sub + '/' + params.slug)
    const post = res.data.post
    return { props: { post } }
}

export default Post
