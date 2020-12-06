import React, {useState} from 'react'
import {Modal, Button} from "react-bootstrap"
import {productArray} from '../redux/productArray'


export default function MyModal(props) {
    
    const [value, setValue] = useState("")
    const category= props.category

    // props => acceptFunction, title, body, category, defaultValue
    const acceptAndClose = (value)=>{
        props.acceptfunction()
        props.onHide()
    }

    return (
      <Modal
        {...props}
        size="sm" //can be lg
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title || "HEADER"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {category==="confirm" ? <p>
            {props.body || "confirm?"}
          </p>
          :
          <p>
              
                <select
                className="form-control select2"
                style={{ width: "100%" }}
                value={value}
                onChange={(e)=>{setValue(e.target.value)}}
                >
                    {productArray.map(element=><option value={element}>{element}</option>)}
                </select>
              
          </p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>Cancel</Button>
          {props.acceptfunction ? <Button variant="success" onClick={()=>acceptAndClose(value)}>Accept</Button> : <>hi</>}
        </Modal.Footer>
      </Modal>
    );
  }