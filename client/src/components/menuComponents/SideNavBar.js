import React from 'react'

export default function SideNavBar({children}) {
    return (
        <nav className="mt-2">
            <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
            >
            {children}
            </ul>
        </nav>
    )
}
