import React from 'react'
import {Link} from 'react-router-dom'

export default function FolderItem({to, icon, text, spanText, spanBadge}) {
    const iClassName = `far nav-icon ${icon || "fa-circle"}` // can add colours with text-danger, text-info, text-danger, text-warning
    const getSpan = () => {
        if(spanText){
            const spanClass=`right badge ${ spanBadge || "badge-danger"}`
            return <span className={spanClass}>{spanText}</span>
        }
    }
    return (
        <li className="nav-item">
            <Link to={to} className="nav-link">
            <i className={iClassName} />
            <p>
            {text}
            {getSpan()}
            </p>
            </Link>
        </li>
    )
}
