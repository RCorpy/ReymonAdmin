import React, {useState, useEffect} from "react";
import Card from "./contentComponents/Card"
import {Table} from "react-bootstrap"

const URL = process.env.URL || 'http://localhost:3000/'

export default function Content({title}) {

  const [tableValues, setTableValues] = useState([
    {       
      name: "Demo Customer",
      createdAt: new Date(),
      category:"customer",
      productName:"product1",
      deliveryDate: new Date(),
      price: 1,
      amount:1,
      total: 1
    }
  ]) 

  useEffect(()=>{
    fetch(`${URL}orders`)
    .then(res=>res.json())
    .then(data=>setTableValues(data))
  },[])

  const createTableContent = () =>{
    return tableValues.map(order=>{
      return (
      <tr>
        <td>{order.name}</td>
        <td>{order.createdAt.getDate() + "-"+ parseInt(order.createdAt.getMonth()+1) +"-"+order.createdAt.getFullYear()}</td>
        <td>{order.category}</td>
        <td>{order.productName}</td>
        <td>{order.deliveryDate.getDate() + "-"+ parseInt(order.deliveryDate.getMonth()+1) +"-"+order.deliveryDate.getFullYear()}</td>
        <td>{order.price}</td>
        <td>{order.amount}</td>
        <td>{order.total}</td>
        <td>{order.completed || false}</td>
      </tr>)
    })

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
              <Card title="Big card">
                <div class="position-relative mb-4">
                  <Table bordered hover>
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>createdAt</th>
                      <th>category</th>
                      <th>productName</th>
                      <th>deliveryDate</th>
                      <th>price</th>
                      <th>amount</th>
                      <th>total</th>
                      <th>completed</th>
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
      {/* /.content */}
    </div>
  );
}
