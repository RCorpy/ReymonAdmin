import React from 'react'

export default function CardHeader({title}) {
    return (
        <div className="card-header border-0">
          <div className="d-flex justify-content-between">
            <h3 className="card-title">{title}</h3>
            <a href="javascript:void(0);">View Report</a>
          </div>
        </div>
    )
}
