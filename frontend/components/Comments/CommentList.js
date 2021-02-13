const BetterDate = require('@tsamantanis/date-lib')
import styles from '../../styles/Comments.module.css'

function CommentList({ comments }) {
    return comments && comments.length > 0 && comments.map((comment, index) => {
        return (
            <div className={`col-12 ${styles.commentContainer} mt-2`} key={index}>
                <span className={styles.timestamp}>{new BetterDate(comment.created_at).when()}</span>
                <p className={styles.comment}>{comment.content}</p>
            </div>
        )
    })
}

export default CommentList
