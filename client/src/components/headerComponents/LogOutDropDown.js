import React from 'react'

export default function LogOutDropDown({icon}) {
    const iClassName = `fas ${icon || "fa-th-large"}`

    return (
        <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
                <i className={iClassName} />
            </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">

            <a href="#" className="dropdown-item">
                <i className="fas fa-id-card" /> View Profile
            </a>
            <div className="dropdown-divider" />

            <a href="#" className="dropdown-item">
                <i className="fas fa-sign-out-alt" /> Log out
            </a>
        </div>

        </li>
    )
}
