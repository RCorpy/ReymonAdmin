import React, {useState, useEffect} from "react";
import Card from "../contentComponents/Card"
import {ButtonGroup, Table} from "react-bootstrap"
import {fetchModifyOrder, fetchDeleteOrder} from '../functions/fetchFunctions'
import Validator from '../functions/validators'
import {Button, InputGroup, ButtonToolbar, FormControl} from 'react-bootstrap';


const URL = process.env.URL || 'http://localhost:3000/'
const validate = new Validator()

const productArray = ["imprimacion", "disolvente", "layers", "noCharge", "threeD"]

const EXAMPLE_ORDER = {
  _id: "qqewqyuweoq",
  orderNumber: "01118601NN",
  customer:{
    telephone:"456798",
    name: "Demo Customer",
    postalCode: "46005",
    address: "C/something",
    city: "Valencia",
    province: "Valencia",
    country: "Spain",
    contact: "Mr. Demo",
    CIF: "03921841L",
    email: "asdasd@fasd.com",
  },
  description: "",
  status: "proforma",
  extraNotes: "",
  category: "Naves",
  productList:{
    imprimacion: { name: "a", color: "a", amount: "1", price: 1, kit: "a", juntas: true },
    disolvente: { name: "b", color: "a", amount: "1", price: 1, kit: "a" },
    layers: [
      { name: "c", color: "c", amount: "3", price: 2, kit: "c" },
      { name: "c", color: "c", amount: "3", price: 2, kit: "c" },
    ],
    noCharge: { name: "d", color: "o", amount: "2", price: 1, kit: "o" },
    threeD: { name: "e", color: "o", amount: "2", price: 1, kit: "o" },
  },
  orderDate: "2020-10-21",
  area: 200,
  resinType: "Acrilica",
  discount: 50,
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
          return {...modifiedOrder}
        }
        else {return mappedOrder}
      })
    })
  } 

  const getTotal = (order)=> {
    console.log(tableValues)
    
    return productArray.reduce((accumulator, product)=>{
      if(product !=="layers"){
        console.log(accumulator)
        return accumulator+(order.productList[product].price*order.productList[product].amount)
      }
      else{
        return accumulator + (order.productList.layers.reduce((acc, layerProduct)=>(acc+layerProduct.price*layerProduct.amount),0)) //temporary
      }
    } , 0)
  }

  const makeNewProduct = () => {
    setToModifyValues(prev=>({...prev, productList: {...prev.productList, layers: [...prev.productList.layers, { name: "yeah baby", color: "c", amount: "3", price: 2, kit: "c" }] }}))
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
        const searchValue = filter.search.value.toLowerCase()
        switch(searchType){
          case "date":
            data = data.filter(order=>(order.orderDate.includes(searchValue)))
            break
          case "name":
            data = data.filter(order=>(order.customer.name.toLowerCase().includes(searchValue)))
            break
          case "telephone":
            data = data.filter(order=>(order.customer.telephone.includes(searchValue)))
            break
          case "orderNumber":
            data = data.filter(order=>(order.orderNumber.toLowerCase().includes(searchValue)))
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
            <td onClick={normalTableClick}>{order.customer.telephone}</td>
            <td onClick={normalTableClick}>{order.customer.name}</td>
            <td onClick={normalTableClick}>{order.customer.city}</td>
            <td onClick={normalTableClick}>{order.orderDate}</td> 
            <td onClick={normalTableClick}>{order.discount}%</td>
            <td onClick={normalTableClick}>{getTotal(order)}</td>
            <td onClick={normalTableClick}>{order.extraNotes ? "yes" : "no"}</td>
            <td onClick={()=>{modifyOrder(order, {...order, completed: !order.completed})}}>{order.completed ? "true": "false"}</td>
            <td><div style={{display:"flex", justifyContent:"center"}} onClick={()=>deleteOrder(order)}><i class="fas fa-trash-alt"></i></div></td> {/*changed deleteOrder(order) to setShow*/}
          </tr>)
    })
  }


  const handleAsideSubmit = (e) => {
    e.preventDefault()

    // NEED TO ADD MORE VALIDATIONS

    if(true ||
      validate.number(toModifyValues.discount) && 
      validate.notEmpty(toModifyValues.customer.name) && 
      validate.date(toModifyValues.orderDate)
      )
      {
      modifyOrder(toModifyValues, toModifyValues)
      setShowMyAsideDiv(false)
      }
    else{
      console.log("error")
    }
  }

  const getMyNewProductList = (product, value, key) => {
    let previousProductArray = toModifyValues.productList
    previousProductArray[product][key] = value
    
    return previousProductArray
  }

  const getMyNewProductListLayers = ( index, value, key) => {
    let previousProductListLayerArray = toModifyValues.productList
    previousProductListLayerArray.layers[index][key] = value
    return previousProductListLayerArray
  }

  const changeSearchValue = (e) => {
    e.persist();

    setFilter((prev) => ({...prev, search: {type: prev.search.type, value: e.target.value}}))
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
                  <Button variant={filter.search.type==="date" ? "primary" : "secondary"} onClick={()=>setFilter(prev=>({...prev, search:{...prev.search, type: "date"}}))}>Date</Button>{' '}
                  <Button variant={filter.search.type==="name" ? "primary" : "secondary"} onClick={()=>setFilter(prev=>({...prev, search:{...prev.search, type: "name"}}))}>Name</Button>{' '}
                  <Button variant={filter.search.type==="telephone" ? "primary" : "secondary"} onClick={()=>setFilter(prev=>({...prev, search:{...prev.search, type: "telephone"}}))}>Telephone</Button>{' '}
                  <Button variant={filter.search.type==="orderNumber" ? "primary" : "secondary"} onClick={()=>setFilter(prev=>({...prev, search:{...prev.search, type: "orderNumber"}}))}>Order Nº</Button>
                </ButtonGroup>
                <InputGroup>
                  <InputGroup.Prepend> {/* MAKE THIS FIXED SIZE SO IT DOESNT WOBBLE */}
                    <InputGroup.Text id="btnGroupAddon2">{filter.search.type==="orderNumber" ? "Order Nº" : filter.search.type.charAt(0).toUpperCase() + filter.search.type.slice(1)}</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type="text"
                    placeholder="Input group example"
                    aria-label="Input group example"
                    aria-describedby="btnGroupAddon2"
                    onChange={(e)=>changeSearchValue(e)}  
                    value={filter.search.value}
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
                      <th>Name</th>
                      <th>City</th>
                      <th>Date</th>
                      <th>Discount</th>
                      <th>Total</th>
                      <th>Notes</th>
                      <th>Completed</th>
                      <th>Delete</th>

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
          <div className="form-group dashboardformgroup">
            <label>Order Number</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,orderNumber:e.target.value})} value={toModifyValues.orderNumber}/>
             {/*<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>*/}
          </div>
          <div className="form-group dashboardformgroup">
            <label>Telephone</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,customer: {...toModifyValues.customer ,telephone:e.target.value}})} value={toModifyValues.customer.telephone}/>
          </div>
          <div className="form-group dashboardformgroup">
            <label>Name</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,customer: {...toModifyValues.customer ,name:e.target.value}})} value={toModifyValues.customer.name}/>
          </div>
          <div className="form-group dashboardformgroup">
            <label>Postal Code</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,customer: {...toModifyValues.customer ,postalCode:e.target.value}})} value={toModifyValues.customer.postalCode}/>
          </div>
          <div className="form-group dashboardformgroup">
            <label>Address</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,customer: {...toModifyValues.customer ,address:e.target.value}})} value={toModifyValues.customer.address}/>
          </div>
          <div className="form-group dashboardformgroup">
            <label>City</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,customer: {...toModifyValues.customer ,city:e.target.value}})} value={toModifyValues.customer.city}/>
          </div>
          <div className="form-group dashboardformgroup">
            <label>Province</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,customer: {...toModifyValues.customer ,province:e.target.value}})} value={toModifyValues.customer.province}/>
          </div>
          <div className="form-group dashboardformgroup">
            <label>Country</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,customer: {...toModifyValues.customer ,country:e.target.value}})} value={toModifyValues.customer.country}/>
          </div>
          <div className="form-group dashboardformgroup">
            <label>Contact</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,customer: {...toModifyValues.customer ,contact:e.target.value}})} value={toModifyValues.customer.contact}/>
          </div>
          <div className="form-group dashboardformgroup">
            <label>CIF</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,customer: {...toModifyValues.customer ,CIF:e.target.value}})} value={toModifyValues.customer.CIF}/>
          </div>
          <div className="form-group dashboardformgroup">
            <label>Email</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,customer: {...toModifyValues.customer ,email:e.target.value}})} value={toModifyValues.customer.email}/>
          </div>


          {/* UP IS CUSTOMER, DOWN IS GENERAL*/}


          <div className="form-group dashboardformgroup">
            <label>Description</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,description:e.target.value})} value={toModifyValues.description} />
          </div>
          <div className="form-group dashboardformgroup">
            <label>Status</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,status:e.target.value})} value={toModifyValues.status} />
          </div>
          <div className="form-group dashboardformgroup">
            <label>Extra Notes</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,extraNotes:e.target.value})} value={toModifyValues.extraNotes} />
          </div>
          <div className="form-group dashboardformgroup">
            <label>Category</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,category:e.target.value})} value={toModifyValues.category} />
          </div>
          <div className="form-group dashboardformgroup">
            <label>Resin</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,resinType:e.target.value})} value={toModifyValues.resinType} />
          </div>
          <div className="form-group dashboardformgroup">
            <label>Date</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,orderDate:e.target.value})} value={toModifyValues.orderDate} />
          </div>
          <div className="form-group dashboardformgroup">
            <label>Area</label>
            <input type="number" onChange={(e)=>setToModifyValues({...toModifyValues ,area:e.target.value})} value={toModifyValues.area} />
          </div>
          <div className="form-group dashboardformgroup">
            <label>Product List</label>
            <button type="button" onClick={makeNewProduct} style={{margin: "0px"}}>Add product</button>
          </div>
          {/*PRODUCT LIST*/}
            <Table bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Color</th>
                        <th>Amount</th>
                        <th>Price</th>
                        <th>Kit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* SI ES "LAYERS" es un array y hay que hacerle otro map */}
                      {productArray.map((product)=>{
                        if (product !== "layers"){ return (
                          <tr>
                            <td><input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,productList: getMyNewProductList(product, e.target.value, "name")})} value={toModifyValues.productList[product].name} /></td>
                            <td><input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,productList: getMyNewProductList(product, e.target.value, "color")})} value={toModifyValues.productList[product].color}/></td>
                            <td><input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,productList: getMyNewProductList(product, e.target.value, "amount")})} value={toModifyValues.productList[product].amount} /></td>
                            <td><input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,productList: getMyNewProductList(product, e.target.value, "price")})} value={toModifyValues.productList[product].price} /></td>
                            <td><input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,productList: getMyNewProductList(product, e.target.value, "kit")})} value={toModifyValues.productList[product].kit} /></td>
                          </tr>)}
                        else{
                          return(
                            <>
                              {toModifyValues.productList.layers.map((layer, index)=>(
                              <tr>
                                <td><input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,productList: getMyNewProductListLayers(index, e.target.value, "name")})} value={toModifyValues.productList.layers[index].name} /></td>
                                <td><input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,productList: getMyNewProductListLayers(index, e.target.value, "color")})} value={toModifyValues.productList.layers[index].color}/></td>
                                <td><input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,productList: getMyNewProductListLayers(index, e.target.value, "amount")})} value={toModifyValues.productList.layers[index].amount} /></td>
                                <td><input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,productList: getMyNewProductListLayers(index, e.target.value, "price")})} value={toModifyValues.productList.layers[index].price} /></td>
                                <td><input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,productList: getMyNewProductListLayers(index, e.target.value, "kit")})} value={toModifyValues.productList.layers[index].kit} /></td>
                              </tr>
                              ))}
                            </>
                          )
                        }
                        })}
                    </tbody>
            </Table>


            {/*END OF PRODUCT LIST*/}
          <div className="form-group dashboardformgroup" style={{marginTop: "10px"}}>
            <label>Discount</label>
            <input type="number" onChange={(e)=>setToModifyValues({...toModifyValues ,discount:e.target.value})} value={toModifyValues.discount} />
          </div>
          <div className="form-group dashboardformgroup" style={{marginTop: "10px"}}>
            <label>Total</label>
            <input type="number" value={getTotal(toModifyValues)} />
          </div>
          <div className="form-group dashboardformgroup">
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
