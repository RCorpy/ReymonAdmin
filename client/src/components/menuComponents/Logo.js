import React from 'react'
import {Link} from 'react-router-dom'

export default function Logo({to, src, text}) {
    return (
        <Link to={to} className="brand-link">
        <img
          src={src}
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">{text}</span>
      </Link>
    )
}
