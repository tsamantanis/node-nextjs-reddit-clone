import Link from 'next/link'
function PanelRight() {
    return (
        <div className="d-none d-md-block col-md-2">
            <Link href="/posts/new" className="btn-block btn-primary">New Post</Link>
        </div>
    )
}

export default PanelRight
