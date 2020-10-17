import React from 'react'

export default function DropDownItem({number, text, time, icon}) {
    const iClassName = `fas ${icon || "fa-envelope"}  mr-2`
    return (
        <div>
        <a href="#" className="dropdown-item">
            <i className={iClassName} /> {number} {text}
            <span className="float-right text-muted text-sm">{time}</span>
        </a>
        <div className="dropdown-divider" />
        </div>
    )
}
