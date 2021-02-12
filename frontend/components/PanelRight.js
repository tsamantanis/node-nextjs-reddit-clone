import Link from 'next/link'
import { useCookies } from "react-cookie"
import styles from '../styles/Layout.module.css'

function PanelRight() {
    const [cookie, setCookie] = useCookies(["nToken"])
    if (cookie && cookie.nToken)
        return (
            <div className="d-none d-md-block col-md-2">
                <Link href="/posts/new">
                    <div className={styles.newPost}>
                        <span>New Post</span>
                    </div>
                </Link>
            </div>
        )
    return null
}

export default PanelRight
