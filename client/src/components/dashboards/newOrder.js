import React, { useState,useEffect } from "react";
import Card from "../contentComponents/Card";
import { InputGroup, FormControl, Button, Table } from "react-bootstrap";
import FormInput from "../contentComponents/formInput";
import NewOrderRow from "./newOrderRow";
import {Link} from 'react-router-dom'
import {addClient, addOrder, searchCustomer, fetchToExcel, openFolder} from "../functions/fetchFunctions";
import {getDate, getOrderNumberPrefix} from "../functions/otherFunctions"
import {connect} from 'react-redux'
import Modal from '../Modal'



const URL = process.env.URL || "http://localhost:3000/";

function NewOrderDashboard({ title , addReduxOrder, state}) {

  const [showModal, setShowModal] = useState(false)
  const [modalProps, setModalProps] = useState({acceptFunction:()=>console.log("works") , title: "My Modal", category: "confirm", body: "modal body"})
 
  const [tableValues, setTableValues] = useState({
    orderNumber: state.nextOrderNumber ? state.nextOrderNumber : getOrderNumberPrefix(),
    customer: {
      telephone: "",
      name: "",
      postalCode: "",
      address: "",
      city: "",
      province: "",
      country: "Spain",
      contact: "",
      CIF: "",
      email: "",
    },
    description: "",
    status: "proforma",
    extraNotes: "",
    category: "Naves",

    orderDate: getDate(),
    area: 0,
    resinType: "Acrilica",
    discount: 50,
    completed: false,
  });

  const [productList, setProductList] = useState({});

  useEffect(()=>{
    let productListObject = {}
    state.priceKeys.map((key)=>{productListObject[key]=[]})
    
    setProductList(productListObject)

  },[state.priceKeys])

  const activateModal = (modalProps) =>{
    setShowModal(true)
    setModalProps(modalProps)
  }

  const addOneLayer = (productType)=>{
    console.log(productType)
    setProductList((prev)=>
      {
        let newProductList = {...prev}
        let firstNameInCategory = Object.keys(state.priceObject[productType])[0]
        let firstColorInFirstName = Object.keys(state.priceObject[productType][firstNameInCategory])[1] // el 0 son las notas especiales
        let firstKit = Object.keys(state.priceObject[productType][firstNameInCategory][firstColorInFirstName])[0]
        let priceForThisKit = state.priceObject[productType][firstNameInCategory][firstColorInFirstName][firstKit]
        if(prev[productType]){
          newProductList[productType] = [...prev[productType], { name: firstNameInCategory, color: firstColorInFirstName, amount: 0, price: priceForThisKit, kit: firstKit }]
      }else{newProductList[productType] = [{ name: firstNameInCategory, color: firstColorInFirstName, amount: 0, price: priceForThisKit, kit: firstKit }]}
        return newProductList
      }
      )
  }

  const searchPrices = ()=>{
console.log("searching")
    
  }

  const filterEmptyLayers = (productType) => {
    let filteredLayers = productList[productType]
    filteredLayers = filteredLayers.filter(layer => (layer.amount>0))
    setProductList((prev)=>      {
      let newProductList = {...prev}
      newProductList[productType] = filteredLayers
      return newProductList
    })
  }

  const filterAllEmptyLayers = () => {
    state.priceKeys.map(element=>{filterEmptyLayers(element)})
  }

  const calcTotal = () => {
    let totalProductList = {...productList}

    //cambiar "layers" por product
    const layerTotal = (product) => {if(totalProductList[product]){
      return totalProductList[product].reduce((accumulator, layer)=>(accumulator+(layer.amount*layer.price)), 0)}}

    return state.priceKeys.reduce((accu, product)=>(accu+layerTotal(product)),0).toFixed(2) || 0
  }

  const modifyProductList = (objectKey, value) => {
    setProductList((prev) => {
      let toReturn = { ...prev };
      toReturn[objectKey] = value
      return toReturn
    });
  };


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
              <Card>
                <div className="position-relative mb-4">
                  <div className="card card-default">
                    <div className="card-header">
                      <h3 className="card-title">Customer</h3>
                      <div className="card-tools">
                        <Button variant="light" onClick={()=>searchCustomer(tableValues.customer.telephone, setTableValues, activateModal)}><i class="fas fa-search"></i></Button>
                        <button
                          type="button"
                          className="btn btn-tool"
                          data-card-widget="collapse"
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                      </div>
                    </div>
                    {/* END OF HEADER */}
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text
                                onClick={()=>searchCustomer(tableValues.customer.telephone, setTableValues, activateModal)}
                                className="telephonePrepend"
                              >
                                Telephone
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                              onChange={(e) => {
                                e.persist();
                                setTableValues((prev) => ({
                                  ...prev,
                                  customer: {
                                    ...prev.customer,
                                    telephone: e.target.value,
                                  },
                                }));
                              }}
                              value={tableValues.customer.telephone}
                            />
                          </InputGroup>
                          <FormInput
                            title="Name"
                            value={tableValues.customer.name}
                            toModify="customer.name"
                            setTableValuesFunction={setTableValues}
                          />
                          <FormInput
                            title="Direccion"
                            value={tableValues.customer.address}
                            toModify="customer.address"
                            setTableValuesFunction={setTableValues}
                          />
                          <FormInput
                            title="Ciudad"
                            value={tableValues.customer.city}
                            toModify="customer.city"
                            setTableValuesFunction={setTableValues}
                          />
                          <FormInput
                            title="Pais"
                            value={tableValues.customer.country}
                            toModify="customer.country"
                            setTableValuesFunction={setTableValues}
                          />
                        </div>
                        <div className="col-md-6">
                          <FormInput
                            title="CIF"
                            value={tableValues.customer.CIF}
                            toModify="customer.CIF"
                            setTableValuesFunction={setTableValues}
                          />
                          <FormInput
                            title="CP"
                            value={tableValues.customer.postalCode}
                            toModify="customer.postalCode"
                            setTableValuesFunction={setTableValues}
                          />
                          <FormInput
                            title="Provincia"
                            value={tableValues.customer.province}
                            toModify="customer.province"
                            setTableValuesFunction={setTableValues}
                          />
                          <FormInput
                            title="Contacto"
                            value={tableValues.customer.contact}
                            toModify="customer.contact"
                            setTableValuesFunction={setTableValues}
                          />
                          <FormInput
                            title="Email"
                            value={tableValues.customer.email}
                            toModify="customer.email"
                            setTableValuesFunction={setTableValues}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="position-relative mb-4">
                  <div className="card card-default">
                    <div className="card-header">
                      <h3 className="card-title">Order</h3>
                      <div className="card-tools">
                        <button
                          type="button"
                          className="btn btn-tool"
                          data-card-widget="collapse"
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                      </div>
                    </div>
                    {/* END OF HEADER */}
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <FormInput
                            title="Order Number"
                            value={tableValues.orderNumber}
                            toModify="orderNumber"
                            setTableValuesFunction={setTableValues}
                          />
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text>Status</InputGroup.Text>
                            </InputGroup.Prepend>
                            <select
                              className="form-control select2"
                              style={{ width: "100%" }}
                              value={tableValues.status}
                              onChange={(e)=>{e.persist();setTableValues((prev)=>({...prev, status: e.target.value}))}}
                            >
                              <option value="proforma">Proforma</option>
                              <option value="presupuesto">Presupuesto</option>
                            </select>
                          </InputGroup>
                          <FormInput
                            title="Descripción"
                            value={tableValues.description}
                            toModify="description"
                            setTableValuesFunction={setTableValues}
                          />
                          <FormInput
                            title="Fecha"
                            value={tableValues.orderDate}
                            toModify="orderDate"
                            setTableValuesFunction={setTableValues}
                          />
                          <FormInput
                            title="Descuento"
                            value={tableValues.discount}
                            toModify="discount"
                            setTableValuesFunction={setTableValues}
                          />
                        </div>
                        <div className="col-md-6">
                          <FormInput
                            title="Category"
                            value={tableValues.category}
                            toModify="category"
                            setTableValuesFunction={setTableValues}
                          />
                          <FormInput
                            title="Extra Notes"
                            value={tableValues.extraNotes}
                            toModify="extraNotes"
                            setTableValuesFunction={setTableValues}
                          />
                          <FormInput
                            title="Area"
                            value={tableValues.area}
                            toModify="area"
                            setTableValuesFunction={setTableValues}
                          />
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text>Tipo de resina</InputGroup.Text>
                            </InputGroup.Prepend>
                            <select
                              className="form-control select2"
                              style={{ width: "100%" }}
                              value={tableValues.resinType}
                              onChange={(e)=>{e.persist();setTableValues((prev)=>({...prev, resinType: e.target.value}))}}
                            >
                              {Object.keys(state.priceKeys).map(key=>(<option value={key}>{key}</option>))}

                            </select>
                          </InputGroup>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <Button onClick={()=>activateModal({acceptFunction:(layer)=>{addOneLayer(layer)}, title: "Add one layer", category: "select product layer", body: `What type?`})}>New Product</Button>
                      </div>
                      <Table bordered hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Color</th>
                          <th>Amount</th>
                          <th>Price</th>
                          <th>Kit</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.priceKeys.map(layer=>{

                          if(productList[layer] && productList[layer].length>0){
                            return (<>
                              <tr>
                                <span>{layer}</span>
                                      <button onClick={()=>filterEmptyLayers(layer)}><i class="fas fa-filter"></i></button>
                              </tr>
                                <NewOrderRow
                                  layer={layer}
                                  items={productList[layer]}
                                  changeFunction={(v)=>{modifyProductList(layer, v)}}
                                />
                                </>
                            )
                          }
                          })}
                      </tbody>
                      </Table>


                      
                            <div>Total: {calcTotal()}</div>
                    </div>
                    <div className="card-body">
                      <Link to={"/Orders"}>
                        <Button onClick={
                          ()=>{fetchToExcel({...tableValues, productList: productList}, state.priceKeys);filterAllEmptyLayers(); addReduxOrder({...tableValues, productList: {...productList}})}
                          }>Finalizar</Button>
                      </Link>
                        <Button variant="success" onClick={()=>{fetchToExcel({...tableValues, productList: productList}, state.priceKeys);filterAllEmptyLayers(); addReduxOrder({...tableValues, productList: {...productList}})}}>Crear y modificar</Button>
                        <Button variant="light" onClick={()=>addClient(tableValues, activateModal)}>Add client</Button>
                      <Link to="/">
                        <Button variant="danger">Cancelar</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        acceptfunction={modalProps.acceptFunction}
        title={modalProps.title}
        category={modalProps.category}
        body={modalProps.body}
      />
    </div>
  );
}

const connectedNewOrdersDashboard = connect(state => ({state:state}), (dispatch)=>({
  addReduxOrder: (order) => {
    addOrder(order)
    dispatch({
      type:"ADD_ORDER",
      lastOrderNumber: order.orderNumber
    })
    }

  }))(NewOrderDashboard)

export default connectedNewOrdersDashboard;