import Link from 'next/link'
import styles from '../styles/Layout.module.css'

function PanelRight() {
    return (
        <div className="d-none d-md-block col-md-2">
            <Link href="/posts/new">
                <div className={styles.newPost}>
                    <span>New Post</span>
                </div>
            </Link>
        </div>
    )
}

export default PanelRight
