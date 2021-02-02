function Navigation() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Reddit.js</a>

            <form className="form-inline my-2 my-lg-0 mx-auto">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            </form>
        </nav>
    )
}

export default Navigation;
