import Navigation from './Navigation'
import PanelLeft from './PanelLeft'
import PanelRight from './PanelRight'

const Layout = ({ children }) => {
    return (
        <>
            <PanelLeft />
            <Navigation />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12 col-sm-2" id="sidebar-wrapper">
                    </div>
                    <div className="col-12 col-md-8" id="page-content-wrapper">
                        { children }
                    </div>
                    <PanelRight />
                </div>
            </div>
        </>
    )
}

export default Layout;
