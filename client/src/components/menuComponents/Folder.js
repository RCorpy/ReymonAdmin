import React from 'react'

export default function Folder({text, icon, spanText, active, spanBadge, children}) {
    const folderIcon = `nav-icon ${icon || "fas fa-tachometer-alt"}`
    const getSpan = () => {
        if(spanText){
            const spanClass=`right badge ${ spanBadge || "badge-danger"}`
            return <span className={spanClass}>{spanText}</span>
        }
    }
    return (
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link active">
                <i className={folderIcon} />
                <p>
                  {text}
                  <i className="right fas fa-angle-left" />
                  {getSpan()}
                </p>
              </a>
              <ul className="nav nav-treeview">
                {children}
              </ul>
            </li>
    )
}
