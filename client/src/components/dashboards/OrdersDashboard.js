import React, {useState, useEffect} from "react";
import Card from "../contentComponents/Card"
import {ButtonGroup, Table} from "react-bootstrap"
import {fetchModifyOrder, fetchDeleteOrder, fetchToExcel} from '../functions/fetchFunctions'
import Validator from '../functions/validators'
import {Button, InputGroup, ButtonToolbar, FormControl} from 'react-bootstrap';
import {connect} from 'react-redux'
import {EXAMPLE_ORDER} from '../../redux/exampleOrder'
import {productArray} from '../../redux/productArray'
import Modal from '../Modal'
import Toasts from '../Toast'

const URL = process.env.URL || 'http://localhost:3000/'
const validate = new Validator()


function OrdersDashboard({title, updateTableValues, setTableValues,reduxDelete, state}) {

  const [showModal, setShowModal] = useState(false)
  const [modalProps, setModalProps] = useState({acceptFunction:()=>console.log("works") , title: "My Modal", category: "confirm", body: "modal body"})
  const [showMyAsideDiv, setShowMyAsideDiv]=useState(false)
  const [toModifyValues, setToModifyValues] = useState(EXAMPLE_ORDER)
  const [statusFilter, setStatusFilter] = useState("all")
  const [filter, setFilter] = useState({completed: true, search: {type: "orderNumber", value: ""}})
  const [toastArray, setToastArray] =useState([])

  const myAsideDivStyle = showMyAsideDiv ? {display: "inline"} :  {display: "none"}


  useEffect(()=>{
    updateTableValues()
  }, [])

  const activateModal = (modalProps) =>{
    setShowModal(true)
    setModalProps(modalProps)
  }

  const getNextStatusFilter = () => {
    if(statusFilter=="all") return "proforma"
    else if(statusFilter=="proforma") return "presupuesto"
    else return "all"
  }

  const modifyOrder = (order, modifiedOrder) => {
    fetchModifyOrder(order, modifiedOrder)
    setTableValues(
      state.lastMonthOrders.map((mappedOrder)=>{
        if(mappedOrder._id === order._id){
          return {...modifiedOrder}
        }
        else {return mappedOrder}
      })
    )
  } 

  const getTotal = (order)=> {
    
    
    return productArray.reduce((accumulator, product)=>{


        return accumulator + (order.productList[product].reduce((acc, layerProduct)=>(acc+layerProduct.price*layerProduct.amount),0)) //temporary
 
    } , 0)
  }

  const makeNewProduct = (product) => {
    console.log(product)
    setToModifyValues(prev=>{
      let newValues = {...prev}
      newValues.productList[product] = [...prev.productList[product], { name: "", color: "", amount: 0, price: 1, kit: "" }] 
      return newValues
    })
  }
//me quede aqui
  const deleteOrder = (order) => {
    activateModal({acceptFunction:()=>{fetchDeleteOrder(order); reduxDelete(order)}, title: "Deleting...", category: "confirm", body: `Are you sure you want to delete ${order.orderNumber}`})
  } 

  //useMemo? useCallback?
  const filterTableValues = () => {
    let data = filter.search.value ? state.totalOrders : state.lastMonthOrders
    //console.log(state)
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
    if(statusFilter!=="all"){
      data = data.filter(order=>(order.status===statusFilter))
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
          <tr key={order._id}>
            <td onClick={normalTableClick}>{order.orderNumber}</td>
            <td onClick={normalTableClick}>{order.customer.telephone}</td>
            <td onClick={normalTableClick}>{order.customer.name}</td>
            <td onClick={normalTableClick}>{order.customer.city}</td>
            <td onClick={normalTableClick}>{order.orderDate}</td> 
            <td onClick={normalTableClick}>{order.discount}%</td>
            <td onClick={normalTableClick}>{getTotal(order)}</td>
            <td onClick={normalTableClick}>{order.extraNotes ? "yes" : "no"}</td>
            <td onClick={()=>{modifyOrder(order, {...order, completed: !order.completed}); createToast(order.completed ? "Order incomplete" : "Order complete", order.customer.name ? `${order.customer.name} order modified`:`Order ${order.orderNumber} modified`)}}>{order.completed ? "true": "false"}</td>
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

  const getMyNewProductListLayers = (product, index, value, key) => {
    let previousProductListLayerArray = toModifyValues.productList
    console.log(previousProductListLayerArray, product)
    previousProductListLayerArray[product][index][key] = value
    return previousProductListLayerArray
  }

  const changeSearchValue = (e) => {
    e.persist();
    setFilter((prev) => ({...prev, search: {type: prev.search.type, value: e.target.value}}))
  }

  const createToast = (title, body)=>{
    let newToast = {
      title: title,
      body:body,
      time: new Date().getTime()
    }
    setToastArray((prev)=>([...prev, newToast]))
  }

  const onDissmiss = (time) =>{
    setToastArray(prev => prev.filter(element=>(element.time!==time)))
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
                style={{marginBottom: "10px"}}
                className="justify-content-between"
                aria-label="Toolbar with Button groups"
              >
                <ButtonGroup aria-label="First group">
                  <Button variant={filter.completed ? "primary" : "secondary"} onClick={()=>setFilter(prev=>({...prev, completed: !prev.completed}))}>{filter.completed ? "Completed Hidden" : "Completed Shown"}</Button>
                  <Button style={{marginLeft: "5px", width: "130px"}}variant={statusFilter === "all" ? "primary" : statusFilter == "proforma" ? "secondary" : "info"} onClick={()=>setStatusFilter(getNextStatusFilter())}>{statusFilter === "all" ? "All" : statusFilter == "proforma" ? "Proformas" : "Presupuestos"}</Button>
                  <Button style={{marginLeft: "5px"}} onClick={()=>{updateTableValues(); createToast("Reloaded","Table values were updated")}}>Reload</Button>  {/*TOAST THIS BETTER THAN MODAL*/}
                </ButtonGroup>
                <ButtonGroup aria-label="First group">
                  <Button variant={filter.search.type==="date" ? "primary" : "secondary"} onClick={()=>setFilter(prev=>({...prev, search:{...prev.search, type: "date"}}))}>Date</Button>{' '}
                  <Button variant={filter.search.type==="name" ? "primary" : "secondary"} onClick={()=>setFilter(prev=>({...prev, search:{...prev.search, type: "name"}}))}>Name</Button>{' '}
                  <Button variant={filter.search.type==="telephone" ? "primary" : "secondary"} onClick={()=>setFilter(prev=>({...prev, search:{...prev.search, type: "telephone"}}))}>Telephone</Button>{' '}
                  <Button variant={filter.search.type==="orderNumber" ? "primary" : "secondary"} onClick={()=>setFilter(prev=>({...prev, search:{...prev.search, type: "orderNumber"}}))}>Order Nº</Button>
                </ButtonGroup>
                <InputGroup style={{width: "280px"}}>
                  <InputGroup.Prepend >
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
            <button type="button" onClick={()=>{activateModal({acceptFunction:(layer)=>{makeNewProduct(layer)}, title: "New Product", category: "Add one layer", body: `Select the category of the new product`})}} style={{margin: "0px"}}>Add product</button>
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
                        return(
                            <>
                              {toModifyValues.productList[product].length>0 ? <td>{product}</td>: <></>}
                              {toModifyValues.productList[product].map((layer, index)=>(
                              <tr>
                                <td><input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,productList: getMyNewProductListLayers(product, index, e.target.value, "name")})} value={toModifyValues.productList[product][index].name} /></td>
                                <td><input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,productList: getMyNewProductListLayers(product, index, e.target.value, "color")})} value={toModifyValues.productList[product][index].color}/></td>
                                <td><input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,productList: getMyNewProductListLayers(product, index, e.target.value, "amount")})} value={toModifyValues.productList[product][index].amount} /></td>
                                <td><input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,productList: getMyNewProductListLayers(product, index, e.target.value, "price")})} value={toModifyValues.productList[product][index].price} /></td>
                                <td><input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,productList: getMyNewProductListLayers(product, index, e.target.value, "kit")})} value={toModifyValues.productList[product][index].kit} /></td>
                              </tr>
                              ))}
                            </>
                          )
                        
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
            <button className="btn btn-primary" type="submit" onClick={()=>{createToast("Saved", "Changes were saved to DB")}}>Save</button> {/*TOAST THIS*/}
            <button className="btn btn-secondary" type="button" onClick={()=>setShowMyAsideDiv(false)}>Close</button> {/*MODAL THIS*/}
            <button className="btn btn-info" type="button" onClick={()=>{fetchToExcel(toModifyValues); createToast("In progress", "Creating excel file")}}>Excel</button>  {/*TOAST THIS*/}
          </div>
          </form>
        </div>
      </div>
      {/* /.content */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        acceptfunction={(layer)=>modalProps.acceptFunction(layer)}
        title={modalProps.title}
        category={modalProps.category}
        body={modalProps.body}
      />
      <Toasts toastArray={toastArray} onDissmiss={onDissmiss}/>
    </div>
  );
}

const connectedOrdersDashboard = connect(state => ({state:state}), (dispatch)=>({
  updateTableValues: () => {
    fetch(`${URL}orders/all`)
    .then(res=>res.json())
    .then(data=>dispatch({
      type:'GET_TABLEVALUES',
      data: data
    }))

  },
  setTableValues: (data)=>{
    dispatch({
      type: 'UPDATE_TABLEVALUES',
      data: data
    })
  },
  reduxDelete:(order)=>{
    dispatch({
      type: 'DELETE_ORDER',
      data: order._id
    })
  }
}))(OrdersDashboard)

export default connectedOrdersDashboard;