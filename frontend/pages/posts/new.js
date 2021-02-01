import Layout from '../../components/Layout'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

function NewPost() {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [error, setError] = useState('')
    async function handleSubmit(event) {
        event.preventDefault()
        if (!title || title.length === 0 || !summary || summary.length === 0) {
            setError('Please fill out all fields')
            return
        }
        try {
            const res = await axios.post(process.env.NEXT_APP_URI + '/posts/new', {
                title: title,
                summary: summary,
            })
            router.push("/")
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                        <form onSubmit={ handleSubmit } method="post">
                            <legend>New Post</legend>
                            <div className="form-group">
                                <label htmlFor="post-title">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    id="post-title"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(event) => {
                                        setTitle(event.target.value);
                                        setError('')
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="post-summary">Summary</label>
                                <textarea
                                    name="summary"
                                    className="form-control"
                                    id="post-summary"
                                    placeholder="Summary"
                                    value={summary}
                                    onChange={(event) => {
                                        setSummary(event.target.value)
                                        setError('')
                                    }}
                                ></textarea>
                            </div>
                            { error && error.length > 0 &&
                                <div className="form-group text-center">
                                    <small className="text-danger">
                                        {error}
                                    </small>
                                </div>
                            }
                            <div className='text-center mt-2'>
                                <button type="submit" className="btn btn-primary">Create Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default NewPost;
