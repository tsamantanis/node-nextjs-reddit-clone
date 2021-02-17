import { useState } from 'react'
import axios from 'axios'
import { useCookies } from "react-cookie"

function CommentReply({ toggleReply, postId, commentId, loadPost}) {
    const [cookies, setCookie, removeCookie] = useCookies(['nToken'])
    const [comment, setComment] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()
        if (!comment || comment.length === 0) {
            setError('Please fill out all fields')
            return
        }
        try {
            const res = await axios.post(process.env.NEXT_APP_URI + '/posts/' + postId + '/comments/' + commentId + '/replies/new', {
                content: comment
            }, { withCredentials: true })
            setComment('')
            setError('')
            toggleReply()
            loadPost()
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <form onSubmit={ handleSubmit } method="post" className="row mt-3">
            <div className="form-group col-12 col-lg-8">
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
            <div className='text-center col-12 col-lg-4'>
                <button className="btn mr-2" onClick={toggleReply}>Cancel</button>
                <button type="submit" className="btn btn-outline-primary">Reply</button>
            </div>
            { error && error.length > 0 &&
                <div className="form-group text-center col-12">
                    <small className="text-danger">
                        {error}
                    </small>
                </div>
            }
        </form>
    )
}

export default CommentReply
