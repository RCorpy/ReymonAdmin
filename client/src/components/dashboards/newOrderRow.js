import React from "react";
const X = { name: "YESSS", color: "c", amount: "3", price: 2, kit: "c" }
export default function newOrderRow({ items, changeFunction }) {

    const arrayChange = (index, value) => {
        let toReturn = items
        items[index] = value
        return toReturn
    }

    return items.map((element, index) => (
      <>
        <input className="col-md-2" value={element.name} onChange={(e)=>changeFunction(arrayChange(index, {...element, name: e.target.value}))} />
        <input className="col-md-2" value={element.color} onChange={(e)=>changeFunction(arrayChange(index, {...element, color: e.target.value}))}/>
        <input className="col-md-2" value={element.amount} onChange={(e)=>changeFunction(arrayChange(index, {...element,  amount: e.target.value}))}/>
        <input className="col-md-2" value={element.price} onChange={(e)=>changeFunction(arrayChange(index, {...element, price: e.target.value}))}/>
        <input className="col-md-2" value={element.kit} onChange={(e)=>changeFunction(arrayChange(index, {...element, kit: e.target.value}))}/>
        <div className="col-md-2">{element.price*element.amount}</div>
      </>
    ));

}
