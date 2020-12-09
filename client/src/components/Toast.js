import React, { useEffect } from "react";
import IndividualToast from "./IndividualToast";

export default function Toasts({ toastArray, onDissmiss }) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "fixed",
        top: 30,
        right: 30,
        
        zIndex: 9999
      }}
    >
      <div
        style={{
          minWidth: "250px",
        }}
      >
        {toastArray.map((element) => (
          <IndividualToast
            key={element.time}
            toastObject={element}
            onDissmiss={onDissmiss}
          />
        ))}
      </div>
    </div>
  );
}
