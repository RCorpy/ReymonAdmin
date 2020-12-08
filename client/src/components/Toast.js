import React,{useEffect} from "react";
import IndividualToast from './IndividualToast'

export default function Toasts({ toastArray, onDissmiss }) {

    useEffect(() => {
if(toastArray.length>0){        toastArray[-1].timer = setTimeout(() => {
            console.log(toastArray[-1].time)
          onDissmiss(toastArray[-1].time)
        }, 3000);
        return () => clearTimeout(toastArray[-1].timer);}
      }, [toastArray]);


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
          <IndividualToast toastObject={element} onDissmiss={onDissmiss}/>
          )
        }
      </div>
    </div>
  );
}
