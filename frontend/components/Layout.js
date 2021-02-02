import Navigation from './Navigation'
import PanelLeft from './PanelLeft'
import PanelRight from './PanelRight'

const Layout = ({ children }) => {
    return (
        <>
            <Navigation />
            <div className="container mt-5">
                <div className="row">
                    <PanelLeft />
                    <div className="col-12 col-md-8">
                        { children }
                    </div>
                    <PanelRight />
                </div>
            </div>
        </>
    )
}

export default Layout;
