import React, {useState, useEffect} from "react";
import Card from "../contentComponents/Card"
import {Table} from "react-bootstrap"
import {fetchModifyOrder, fetchDeleteOrder} from '../functions/fetchFunctions'

const URL = process.env.URL || 'http://localhost:3000/'

export default function OrdersDashboard({title}) {

  const [tableValues, setTableValues] = useState([
    {
      _id: "qqewqyuweoq",       
      name: "Demo Customer",
      createdAt: "2020-10-21T08:52:51.155+00:00",
      category:"customer",
      productName:"product1",
      deliveryDate: "2020-10-21T08:52:51.155+00:00",
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

  const modifyOrder = (order, modifiedOrder) => {
    fetchModifyOrder(order, modifiedOrder)
    setTableValues((prev)=>{
      return prev.map((mappedOrder)=>{
        if(mappedOrder._id === order._id){
          return modifiedOrder
        }
        else {return mappedOrder}
      })
    })
  } 

  const deleteOrder = (order) => {
    fetchDeleteOrder(order)
    setTableValues((prev)=>{
      return prev.filter(toFilterOrder => toFilterOrder._id !== order._id)
    })
  } 

  const createTableContent = () =>{
    return tableValues.map(order=>{
      return (
      <tr>
        <td>{order.name}</td>
        <td>{order.category}</td>
        <td>{order.productName}</td>
        <td>{order.deliveryDate.split("T")[0]}</td> {/* because it recieves it as a string from DB */}
        <td>{order.price}</td>
        <td>{order.amount}</td>
        <td>{order.total}</td>
        <td>{order.completed || "false"}</td>
        <td><div style={{display:"flex", justifyContent:"center"}} onClick={()=>modifyOrder(order, {...order, completed: !order.completed})}><i class="far fa-edit"></i></div></td>
        <td><div style={{display:"flex", justifyContent:"center"}} onClick={()=>deleteOrder(order)}><i class="fas fa-trash-alt"></i></div></td>
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
                      {/*<th>createdAt</th>*/}
                      <th>category</th>
                      <th>productName</th>
                      <th>deliveryDate</th>
                      <th>price</th>
                      <th>amount</th>
                      <th>total</th>
                      <th>completed</th>
                      <th>edit</th>
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
      {/* /.content */}
    </div>
  );
}
