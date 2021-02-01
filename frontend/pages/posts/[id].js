function Post({ post }) {
    return <h1>{post}</h1>
}

export async function getStaticPaths() {
    // const res = await fetch(`${process.env.NEXT_APP_URI}/posts/`)
    // const posts = await res.json()
    //
    // const paths = posts.map((post) => `/posts/${post.id}`)
    const paths = ['/posts/0', '/posts/1']
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    // const res = await fetch(`${process.env.NEXT_APP_URI}/posts/${ + params.id}`)
    // const post = await res.json()
    const post = 'Hello world!'
    return { props: { post } }
}

export default Post
