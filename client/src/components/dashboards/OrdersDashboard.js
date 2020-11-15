import React, {useState, useEffect} from "react";
import Card from "../contentComponents/Card"
import {ButtonGroup, Table} from "react-bootstrap"
import {fetchModifyOrder, fetchDeleteOrder} from '../functions/fetchFunctions'
import Validator from '../functions/validators'
import {Button, InputGroup, ButtonToolbar, FormControl} from 'react-bootstrap';


const URL = process.env.URL || 'http://localhost:3000/'
const validate = new Validator()

const EXAMPLE_ORDER = {
  _id: "qqewqyuweoq",       
  name: "Demo Customer",
  location: "Valencia",
  category: "HS100",
  floorType: "hormigon",
  productList: [{name: "HS100", amount: "2", price: 27, kit: "20Kgs"}, {name: "Disolvente", amount: "1", price: 3, kit: "1L"}],
  deliveryDate: "2020-10-21",
  area: 200,
  orderNumber: "01118601NN",
  telephone:"456798",
  discount: 1,
  completed: false
}



export default function OrdersDashboard({title}) {

  const [showMyAsideDiv, setShowMyAsideDiv]=useState(false)
  const [tableValues, setTableValues] = useState([EXAMPLE_ORDER])
  const [toModifyValues, setToModifyValues] = useState(EXAMPLE_ORDER)
  const [filter, setFilter] = useState({completed: true, search: {type: "orderNumber", value: ""}})

  const myAsideDivStyle = showMyAsideDiv ? {display: "inline"} :  {display: "none"}


  useEffect(()=>{
    fetch(`${URL}orders/all`)
    .then(res=>res.json())
    .then(data=>setTableValues(data))
  },[])

  const modifyOrder = (order, modifiedOrder) => {
    fetchModifyOrder(order, modifiedOrder)
    setTableValues((prev)=>{
      return prev.map((mappedOrder)=>{
        if(mappedOrder._id === order._id){
          let updatedProductList = modifiedOrder.productList.filter(product=> product.name !== "new").filter(product => product.name !=="")
          return {...modifiedOrder, productList: updatedProductList}
        }
        else {return mappedOrder}
      })
    })
  } 

  const getTotal = (order)=> {
    return order.productList.reduce((accumulator, product)=>accumulator+(product.price*product.amount) , 0)
  }

  const getNewProductList = (index, name, price, amount, kit) => {
    let previousProductList = toModifyValues.productList
    previousProductList[index]={name: name, price: price, amount: amount}
    console.log(previousProductList)
    return previousProductList
  }

  const makeNewProduct = () => {
    setToModifyValues(prev=>({...prev, productList: [...prev.productList, {name: "new", price: 0, amount: 0, kit: 0}]}))

  }

  const deleteOrder = (order) => {
    fetchDeleteOrder(order)
    setTableValues((prev)=>{
      return prev.filter(toFilterOrder => toFilterOrder._id !== order._id)
    })
  } 

  const filterTableValues = () => {
    let data = tableValues
    if(filter){
      if(filter.completed){
        data = data.filter(order=>(!order.completed))
      }
      if(filter.search && filter.search.type){
        const searchType = filter.search.type
        const searchValue = filter.search.value
        switch(searchType){
          case "date":
            data = data.filter(order=>(order.deliveryDate.includes(searchValue)))
            break
          case "name":
            data = data.filter(order=>(order.name.includes(searchValue)))
            break
          case "telephone":
            data = data.filter(order=>(order.telephone.includes(searchValue)))
            break
          case "orderNumber":
            data = data.filter(order=>(order.orderNumber.includes(searchValue)))
            break
          default:
            break
        }
      }
    }

    return data
  }

  const createTableContent = () =>{
    return filterTableValues().map(order=>{
        const normalTableClick = ()=>{
          setShowMyAsideDiv(!showMyAsideDiv)
          setToModifyValues(order)
      }
          return (
          <tr>
            <td onClick={normalTableClick}>{order.orderNumber}</td>
            <td onClick={normalTableClick}>{order.telephone}</td>
            <td onClick={normalTableClick}>{order.name}</td>
            <td onClick={normalTableClick}>{order.location}</td>
            <td onClick={normalTableClick}>{order.category}</td>
            <td onClick={normalTableClick}>{order.floorType}</td>
            <td onClick={normalTableClick}>{order.area}</td>
            <td onClick={normalTableClick}>{order.deliveryDate}</td> 
            <td onClick={normalTableClick}>{order.discount}</td>
            <td onClick={normalTableClick}>{getTotal(order)}</td>
            <td onClick={()=>{modifyOrder(order, {...order, completed: !order.completed})}}>{order.completed ? "true": "false"}</td>
            <td><div style={{display:"flex", justifyContent:"center"}} onClick={()=>deleteOrder(order)}><i class="fas fa-trash-alt"></i></div></td> {/*changed deleteOrder(order) to setShow*/}
          </tr>)
    })
  }


  const handleAsideSubmit = (e) => {
    e.preventDefault()
    if(true ||
      validate.number(toModifyValues.price) && 
      validate.number(toModifyValues.discount) && 
      validate.notEmpty(toModifyValues.name) && 
      validate.notEmpty(toModifyValues.category) && 
      validate.notEmpty(toModifyValues.location) && 
      validate.notEmpty(toModifyValues.productList) && 
      validate.date(toModifyValues.deliveryDate)
      )
      {
      modifyOrder(toModifyValues, toModifyValues)
      setShowMyAsideDiv(false)
      }
    else{
      console.log("error")
    }
  }


  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">{title}</h1>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <Card title="Orders">

              {/* Filter options*/}
              <ButtonToolbar
                className="justify-content-between"
                aria-label="Toolbar with Button groups"
              >
                <ButtonGroup aria-label="First group">
                  <Button variant={filter.completed ? "primary" : "secondary"} onClick={()=>setFilter(prev=>({...prev, completed: !prev.completed}))}>{filter.completed ? "Completed Hidden" : "Completed Shown"}</Button>
                </ButtonGroup>
                <ButtonGroup aria-label="First group">
                  <Button variant="secondary">Date</Button>{' '}
                  <Button variant="secondary">Name</Button>{' '}
                  <Button variant="secondary">Telephone</Button>{' '}
                  <Button variant="secondary">Order Nº</Button>
                </ButtonGroup>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="btnGroupAddon2">@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type="text"
                    placeholder="Input group example"
                    aria-label="Input group example"
                    aria-describedby="btnGroupAddon2"
                  />
                </InputGroup>
              </ButtonToolbar>
              {/* / Filter options*/}

                <div class="position-relative mb-4">
                  <Table bordered hover>
                  <thead>
                    <tr>
                      <th>Order Number</th>
                      <th>Telephone</th>
                      <th>name</th>
                      <th>location</th>
                      <th>category</th>
                      <th>floor</th>
                      <th>area</th>
                      <th>deliveryDate</th>
                      <th>discount</th>
                      <th>total</th>
                      <th>completed</th>
                      <th>delete</th>

                    </tr>
                  </thead>
                  <tbody>
                    {createTableContent()}
                  </tbody>
                  </Table>
                </div>
              </Card>
              
            </div>
            
          </div>
        </div>
        
        {/* /.container-fluid */}

      </div>
      <div className="wrapper myasidediv col-lg-6" style={myAsideDivStyle}>
        <div className="zindex1500">
          <h4>Modifying {toModifyValues._id}</h4>
          <form className="asideform" onSubmit={handleAsideSubmit}>
          <div className="form-group">
            <label>Order Number</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,orderNumber:e.target.value})} value={toModifyValues.orderNumber}/>
             {/*<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>*/}
          </div>
          <div className="form-group">
            <label>Telephone</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,telephone:e.target.value})} value={toModifyValues.telephone}/>
          </div>
          <div className="form-group">
            <label>Name</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,name:e.target.value})} value={toModifyValues.name}/>
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,location:e.target.value})} value={toModifyValues.location}/>
          </div>
          <div className="form-group">
            <label>Category</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,category:e.target.value})} value={toModifyValues.category} />
          </div>
          <div className="form-group">
            <label>Floor Type</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,floorType:e.target.value})} value={toModifyValues.floorType}/>
          </div>

          <div className="form-group">
            <label>Delivery Date</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,deliveryDate:e.target.value})} value={toModifyValues.deliveryDate} />
          </div>
          <div className="form-group">
            <label>Area</label>
            <input type="number" onChange={(e)=>setToModifyValues({...toModifyValues ,area:e.target.value})} value={toModifyValues.area} />
          </div>
          <div className="form-group">
            <label>Product List</label>
            <button type="button" onClick={makeNewProduct} style={{margin: "0px"}}>Add product</button>
          </div>
          {/*PRODUCT LIST*/}
            <Table bordered hover>
                    <thead>
                      <tr>
                        <th>name</th>
                        <th>amount</th>
                        <th>price</th>
                        <th>kit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {toModifyValues.productList.map((product, index)=>(
                        <tr>
                          <td><input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,productList: getNewProductList(index, e.target.value, product.price, product.amount, product.kit)})} value={product.name} /></td>
                          <td><input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,productList: getNewProductList(index, product.name, product.price, e.target.value, product.kit)})} value={product.amount} /></td>
                          <td><input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,productList: getNewProductList(index, product.name, e.target.value, product.amount, product.kit)})} value={product.price} /></td>
                          <td><input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,productList: getNewProductList(index, product.name, product.price, product.amount, e.target.value)})} value={product.kit} /></td>
                        </tr>))}
                    </tbody>
            </Table>


            {/*END OF PRODUCT LIST*/}
          <div className="form-group" style={{marginTop: "10px"}}>
            <label>Discount</label>
            <input type="number" onChange={(e)=>setToModifyValues({...toModifyValues ,discount:e.target.value})} value={toModifyValues.discount} />
          </div>
          <div className="form-group" style={{marginTop: "10px"}}>
            <label>Total</label>
            <input type="number" value={getTotal(toModifyValues)} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">Save</button>
            <button className="btn btn-secondary" type="button" onClick={()=>setShowMyAsideDiv(false)}>Close</button>
          </div>
          </form>
        </div>
      </div>
      {/* /.content */}
      
    </div>
  );
}
