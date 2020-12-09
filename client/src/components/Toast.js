import React,{useEffect} from "react";
import IndividualToast from './IndividualToast'

export default function Toasts({ toastArray, onDissmiss }) {


  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "absolute",
      top: 80,
      right: 30,
        minHeight: "200px",
      }}
    >
      <div
      style={{
        minWidth: "250px"
    }}

      >
        {
          toastArray.map(element=>
            <IndividualToast key={element.time} toastObject={element} onDissmiss={onDissmiss}/>
          )
        }
      </div>
    </div>
  );
}
