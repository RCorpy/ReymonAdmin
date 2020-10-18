import React from 'react'
import {Link} from 'react-router-dom'

export default function User({src, name, to}) {
    return (
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src={src}
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <Link to={to} className="d-block">
              {name}
            </Link>
          </div>
        </div>
    )
}
