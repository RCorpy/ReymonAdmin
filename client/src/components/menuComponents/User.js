import React from 'react'

export default function User({src, name}) {
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
            <a href="#" className="d-block">
              {name}
            </a>
          </div>
        </div>
    )
}
