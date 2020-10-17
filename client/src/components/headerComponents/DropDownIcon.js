import React from 'react'

export default function DropDownIcon({totalNotifications, icon, children}) {
    const iClassName = `far ${icon || "fa-bell"}`
    return (
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <i className={iClassName} />
            <span className="badge badge-warning navbar-badge">{totalNotifications}</span>
          </a>
          {children}
        </li>
    )
}
