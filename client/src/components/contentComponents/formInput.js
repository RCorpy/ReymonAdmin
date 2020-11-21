import React from 'react'
import { InputGroup, FormControl } from "react-bootstrap";

export default function FormInput({title, value, toModify, setTableValuesFunction}) {
    return (
        <InputGroup>
            <InputGroup.Prepend>
            <InputGroup.Text>
                {title}
            </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl 
            onChange={(e)=>
                {
                e.persist()
                setTableValuesFunction((prev)=>{
                    let myNewTable = {...prev}
                    if(toModify.split(".")[1]){myNewTable.customer[toModify.split(".")[1]]=e.target.value}
                    else{myNewTable[toModify]=e.target.value}
                    
                    return myNewTable
                })
                }
                } 
            value={value}/>
        </InputGroup>
    )
}
