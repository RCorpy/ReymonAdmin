import React from 'react'


export default function Card({title, headerButtons, children}) {
    const getButtons = ()=>{
        if(headerButtons){
        return headerButtons.map(button=>{
            let href = button.href || "#"
            if(button.text){return <a href={href}>{button.text}</a>}
            else if(button.icon){
                return  <a href={href} className="btn btn-tool btn-sm">
                            <i className={button.icon} />
                        </a>}
        })}
    }
    return (
        <div className="card">
            <div className="card-header border-0">
            <div className="d-flex justify-content-between">
                <h3 className="card-title">{title}</h3>
                <div className="card-tools">
                {getButtons()}
                </div>
            </div>
            </div>
            <div className="card-body">
            {/* BODY */}
            {children}
            </div>
        </div>
    )
}
