import { useState } from 'react'
import axios from 'axios'

function NewComment({ postId }) {
    const [comment, setComment] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()
        if (!comment || comment.length === 0) {
            setError('Please fill out all fields')
            return
        }
        try {
            const res = await axios.post(process.env.NEXT_APP_URI + '/posts/' + postId + '/comments/new', {
                content: comment
            })
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <form onSubmit={ handleSubmit } method="post" className="row">
            <div className="form-group col-12 col-lg-9">
                <input
                    type="text"
                    name="comment"
                    className="form-control"
                    id="post-comment"
                    placeholder="Reply with a comment"
                    value={comment}
                    onChange={(event) => {
                        setComment(event.target.value);
                        setError('')
                    }}
                />
            </div>
            { error && error.length > 0 &&
                <div className="form-group text-center col-12">
                    <small className="text-danger">
                        {error}
                    </small>
                </div>
            }
            <div className='text-center col-12 col-lg-3'>
                <button type="submit" className="btn btn-outline-primary">Comment</button>
            </div>
        </form>
    )
}

export default NewComment
