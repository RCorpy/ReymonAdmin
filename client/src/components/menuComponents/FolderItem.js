import React from 'react'

export default function FolderItem({href, icon, text, spanText, spanBadge}) {
    const iClassName = `far nav-icon ${icon || "fa-circle"}` // can add colours with text-danger, text-info, text-danger, text-warning
    const getSpan = () => {
        if(spanText){
            const spanClass=`right badge ${ spanBadge || "badge-danger"}`
            return <span className={spanClass}>{spanText}</span>
        }
    }
    return (
        <li className="nav-item">
            <a href={href} className="nav-link">
            <i className={iClassName} />
            <p>
            {text}
            {getSpan()}
            </p>
            </a>
        </li>
    )
}
