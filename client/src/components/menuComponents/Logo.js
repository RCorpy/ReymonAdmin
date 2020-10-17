import React from 'react'

export default function Logo({link, src, text}) {
    return (
        <a href={link} className="brand-link">
        <img
          src={src}
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">{text}</span>
      </a>
    )
}
