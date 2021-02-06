import styles from '../../styles/Comments.module.css'

function CommentList({ comments }) {
    return comments && comments.length > 0 && comments.map((comment, index) => {
        return (
            <div className={`col-12 ${styles.commentContainer}`} key={index}>
                <span className={styles.timestamp}>{comment.created_at}</span>
                <p className={styles.comment}>{comment.content}</p>
            </div>
        )
    })
}

export default CommentList
