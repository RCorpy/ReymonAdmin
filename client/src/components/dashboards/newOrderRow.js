import React from "react";
import {connect} from "react-redux"

function NewOrderRow({ items, changeFunction, layer, state }) {

    const arrayChange = (index, value) => {
        let toReturn = items
        items[index] = value
        return toReturn
    }

    const productPossibilities = Object.keys(state.priceObject[layer])
    //hacer cambios en otras columnas solo cuando no exista la posibilidad de la opcion actual
    //formatear la tabla

    return items.map((element, index) => {
      const colorPossibilities = Object.keys(state.priceObject[layer][element.name])
      colorPossibilities.shift()
      const kitPossibilities = Object.keys(state.priceObject[layer][element.name][element.color])
      return (
      <tr>
        <td>
          <select
          value={element.name}
          onChange={
            (e)=>{
              console.log(state.priceObject[layer])
              let getFirstColor= Object.keys(state.priceObject[layer][e.target.value])[1]
              let getFirstKit=Object.keys(state.priceObject[layer][e.target.value][getFirstColor])[0]
              let getPrice = state.priceObject[layer][e.target.value][getFirstColor][getFirstKit]
              changeFunction(arrayChange(index, {...element, name: e.target.value, color: getFirstColor, kit: getFirstKit, price: getPrice})) 
            }
          }
          >
            {productPossibilities.map(color=>(<option value={color}>{color}</option>))}
          </select>
        </td>
        <td>
          <select
          value={element.color}
          onChange={
            (e)=>{
              
              let getFirstKit = Object.keys(state.priceObject[layer][element.name][e.target.value])[0]
              let getFirstKitPrice = state.priceObject[layer][element.name][e.target.value][getFirstKit]
              changeFunction(arrayChange(index, {...element, color: e.target.value, kit: getFirstKit, price: getFirstKitPrice}))
            }
          }
          >
            {colorPossibilities.map(product=>(<option value={product}>{product}</option>))}
          </select>
        </td>
        <td>
          <input className="col-md-2" value={element.amount} onChange={(e)=>changeFunction(arrayChange(index, {...element,  amount: e.target.value}))}/>
        </td>
        <td>
          <input className="col-md-2" value={element.price} onChange={(e)=>changeFunction(arrayChange(index, {...element, price: e.target.value}))}/>
        </td>    
        <td>    
          <select
          value={element.kit}
          onChange={
            (e)=>{
              
              let getFirstKitPrice = state.priceObject[layer][element.name][element.color][e.target.value]
              changeFunction(arrayChange(index, {...element, kit: e.target.value, price: getFirstKitPrice}))
            }
          }
          >
            {kitPossibilities.map(product=>(<option value={product}>{product}</option>))}
          </select>
          </td>
        <td>
          <input className="col-md-2" value={element.price*element.amount}></input>
        </td>
      </tr>
    )});

}

const connectedNewOrderRow = connect(state => ({state:state}), (dispatch)=>({
  updateTableValues: () => {
    fetch(`${URL}orders/all`)
    .then(res=>res.json())
    .then(data=>dispatch({
      type:'GET_TABLEVALUES',
      data: data
    }))

  }
}))(NewOrderRow)

export default connectedNewOrderRow;