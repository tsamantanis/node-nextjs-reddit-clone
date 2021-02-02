import Link from 'next/link'
import styles from '../styles/Layout.module.css'

function PanelLeft() {
    return (
        <div className="d-none d-md-block col-md-2">
            <div className="row">
                <div className="col-12">
                    <Link href="/">
                        <div className={styles.menuItem}>
                            <span className={styles.item}>Menu</span>
                        </div>
                    </Link>
                    <Link href="/posts">
                        <div className={styles.menuItem}>
                            <span className={styles.item}>Home</span>
                        </div>
                    </Link>
                    <Link href="/">
                        <div className={styles.menuItem}>
                            <span className={styles.item}>Explore Topics</span>
                        </div>
                    </Link>
                    <Link href="/">
                        <div className={styles.menuItem}>
                            <span className={styles.item}>My Topics</span>
                        </div>
                    </Link>
                    <Link href="/">
                        <div className={styles.menuItem}>
                            <span className={styles.item}>My Answers</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PanelLeft
