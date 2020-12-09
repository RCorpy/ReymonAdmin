import React, {useEffect} from 'react'
import {Toast} from 'react-bootstrap';


export default function IndividualToast({toastObject, onDissmiss}) {


    useEffect(() => {
        const timer = setTimeout(() => {
            onDissmiss(toastObject.time)
            }, 3000);
                return () => clearTimeout(timer);
              }, []);
        
      
    return (
        <div>
                      <Toast key={toastObject.time}>
            <Toast.Header onClick={()=>onDissmiss(toastObject.time)}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">{toastObject.title || "No title"}</strong>
              <small>{toastObject.time|| ""}</small>
            </Toast.Header>
            <Toast.Body>{toastObject.body || "An error occurred, notification without body"}</Toast.Body>
          </Toast>
        </div>
    )
}
