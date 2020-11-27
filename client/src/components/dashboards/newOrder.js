import React, { useState } from "react";
import Card from "../contentComponents/Card";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import FormInput from "../contentComponents/formInput";
import NewOrderRow from "./newOrderRow";
import {Link} from 'react-router-dom'
import {addOrder} from "../functions/fetchFunctions";

const URL = process.env.URL || "http://localhost:3000/";

export default function ProductsDashboard({ title }) {
  const [tableValues, setTableValues] = useState({
    orderNumber: "01118601NN",
    customer: {
      telephone: "456798",
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

    orderDate: "2020-10-21",
    area: 200,
    resinType: "Acrilica",
    discount: 50,
    completed: false,
  });

  const [productList, setProductList] = useState({
    imprimacion: { name: "a", color: "a", amount: 1, price: 1, kit: "a", juntas: true },
    disolvente: { name: "a", color: "a", amount: 1, price: 1, kit: "a" },
    layers: [
      { name: "c", color: "c", amount: 3, price: 2, kit: "c" },
      { name: "c", color: "c", amount: 3, price: 2, kit: "c" },
    ],
    noCharge: { name: "o", color: "o", amount: 2, price: 1, kit: "o" },
    threeD: { name: "o", color: "o", amount: 2, price: 1, kit: "o" },
  });

  const calcTotal = () => {
    let totalProductList = {...productList}
    //console.log(totalProductList.layers)
    let layersTotal = totalProductList.layers.reduce((accumulator, layer)=>(accumulator+(layer.amount*layer.price)), 0)
    let othersTotal =  ["imprimacion", "disolvente", "noCharge", "threeD"].reduce((accumulator, listPart)=>(accumulator+(totalProductList[listPart].price*totalProductList[listPart].amount)),0)
    return othersTotal + layersTotal
  }

  const modifyProductList = (objectKey, value) => {
    console.log(value)
    setProductList((prev) => {
      let toReturn = { ...prev };
      toReturn[objectKey] = value
      return toReturn
    });
  };

  const searchCustomer = () => {
    console.log("SEARCHING");
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
                                onClick={searchCustomer}
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
                          <FormInput
                            title="Status"
                            value={tableValues.status}
                            toModify="status"
                            setTableValuesFunction={setTableValues}
                          />
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
                              <option value="Epoxi">Epoxi</option>
                              <option value="Epoxi W">Epoxi W</option>
                              <option value="Acrilica">Acrilica</option>
                              <option value="Politop">Politop</option>
                            </select>
                          </InputGroup>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-2">Name</div>
                        <div className="col-md-2">Color</div>{" "}
                        <div className="col-md-2">Amount</div>{" "}
                        <div className="col-md-2">Price</div>
                        <div className="col-md-2">Kit</div>
                        <div className="col-md-2">Total</div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <span>Imprimación</span>
                        </div>
                        <NewOrderRow
                          items={productList.imprimacion}
                          changeFunction={(v)=>{modifyProductList("imprimacion", v)}}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <span>Capas</span>
                        </div>
                        <NewOrderRow
                          items={productList.layers}
                          changeFunction={(v)=>{modifyProductList("layers", v)}}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <span>Disolvente</span>
                        </div>
                        <NewOrderRow
                          items={productList.disolvente}
                          changeFunction={(v)=>{modifyProductList("disolvente", v)}}
                        />

                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <span>Sin Cargo</span>
                        </div>
                        <NewOrderRow
                          items={productList.noCharge}
                          changeFunction={(v)=>{modifyProductList("noCharge", v)}}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <span>3D</span>
                        </div>
                        <NewOrderRow
                          items={productList.threeD}
                          changeFunction={(v)=>{modifyProductList("threeD", v)}}
                        />
                      </div>
                            <div>Total: {calcTotal()}</div>
                    </div>
                    <div className="card-body">
                      <Link to={"/Orders"}>
                        <Button onClick={()=>addOrder({...tableValues, productList: {...productList}})}>Finalizar</Button>
                      </Link>
                        <Button variant="success" onClick={()=>addOrder({...tableValues, productList: {...productList}})}>Crear y modificar</Button>
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
    </div>
  );
}
