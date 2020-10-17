import React from 'react'

//includes button to collapse
export default function LeftContainer({children}) {
    return (
    <ul className="navbar-nav">
        <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                <i className="fas fa-bars" />
            </a>
        </li>
        {children}
    </ul>
    )
}
