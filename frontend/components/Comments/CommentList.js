import { useState } from 'react'
import CommentReply from './CommentReply'
import styles from '../../styles/Comments.module.css'
const BetterDate = require('@tsamantanis/date-lib')

function CommentList({ postId, comments, author, loadPost }) {
    const [reply, setReply] = useState(null)

    return comments && comments.length > 0 && comments.map((comment, index) => {
        return (
            <div className={`col-12 ${styles.commentContainer} mt-2`} key={index}>
                <span className={`${styles.username} mr-2`}>{ comment.author.username }</span>
                <span className={styles.timestamp}>{new BetterDate(comment.created_at).when()}</span>
                <p className={styles.comment}>{comment.content}</p>
                { reply && reply === comment._id ?
                    <CommentReply
                        commentId={ comment._id }
                        postId={ postId }
                        loadPost={ loadPost }
                        toggleReply={() => setReply(null)}
                    />
                    :
                    <button
                        className={styles.replyButton}
                        onClick={() => setReply(comment._id)}
                    >
                        Reply
                    </button>
                }
                { comment.comments
                    && <CommentList
                        comments={ comment.comments }
                        author={ author }
                        postId={ postId }
                        loadPost={ loadPost }
                    />
                }
            </div>
        )
    })
}

export default CommentList
