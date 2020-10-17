import React from 'react'

export default function LeftLink({href, text}) {
    return (
        <li className="nav-item d-none d-sm-inline-block">
          <a href={href} className="nav-link">
            {text}
          </a>
        </li>
    )
}
