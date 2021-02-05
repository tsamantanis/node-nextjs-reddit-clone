import axios from 'axios'
function Post({ post }) {
    return <h1>{post.title}</h1>
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
