import React, { useState } from "react";
import Card from "../contentComponents/Card";
import { InputGroup, FormControl } from "react-bootstrap";
import FormInput from "../contentComponents/formInput";
import {
  fetchModifyProduct,
  fetchDeleteProduct,
} from "../functions/fetchFunctions";

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
    productList: [
      { name: "HS100", color: "white", amount: "2", price: 27, kit: "20Kgs" },
      { name: "Disolvente", color: "none", amount: "1", price: 3, kit: "1L" },
    ],
    orderDate: "2020-10-21",
    area: 200,
    resinType: "Acrilica",
    discount: 50,
    completed: false,
  });

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
                  </div>
                </div>
                <div className="position-relative mb-4">
                  <div className="card card-default"></div>
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
