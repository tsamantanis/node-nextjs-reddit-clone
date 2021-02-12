import { useCookies } from "react-cookie"
import styles from '../styles/Layout.module.css'

function Navigation() {
    const [cookie, setCookie, removeCookie] = useCookies(["user"]);

    function logout() {
        removeCookie("nToken");
    }
    return (
        <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
            <a className="navbar-brand" href="/">Reddit.js</a>

            <form className="form-inline my-2 my-lg-0 mx-auto">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            </form>
            { cookie && cookie.nToken && <button onClick={ logout } className="btn btn-outline-danger">Logout</button> }
        </nav>
    )
}

export default Navigation;
