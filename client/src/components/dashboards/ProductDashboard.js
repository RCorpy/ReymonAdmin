import React, {useState, useEffect} from "react";
import Card from "../contentComponents/Card"
import {Table} from "react-bootstrap"
import {fetchModifyProduct, fetchDeleteProduct} from '../functions/fetchFunctions'

const URL = process.env.URL || 'http://localhost:3000/'

export default function ProductsDashboard({title}) {

  const [tableValues, setTableValues] = useState([
    {
      _id: "qqewqyuweoq",       
      name: "Demo Customer",
      price: 50
    }
  ]) 

  useEffect(()=>{
    fetch(`${URL}products`)
    .then(res=>res.json())
    .then(data=>setTableValues(data))
  },[])

  const modifyProduct = (product, modifiedProduct) => {
    fetchModifyProduct(product, modifiedProduct)
    setTableValues((prev)=>{
      return prev.map((mappedProduct)=>{
        if(mappedProduct._id === product._id){
          return modifiedProduct
        }
        else {return mappedProduct}
      })
    })
  } 

  const deleteProduct = (product) => {
    fetchDeleteProduct(product)
    setTableValues((prev)=>{
      return prev.filter(toFilterProduct => toFilterProduct._id !== product._id)
    })
  } 

  const createTableContent = () =>{
    return tableValues.map(product=>{
      return (
      <tr>
        <td>{product.name}</td>
        <td>{product.discount}</td>
        <td><div style={{display:"flex", justifyContent:"center"}} onClick={()=>modifyProduct(product, {...product, discount: 20})}><i class="far fa-edit"></i></div></td>
        <td><div style={{display:"flex", justifyContent:"center"}} onClick={()=>deleteProduct(product)}><i class="fas fa-trash-alt"></i></div></td>
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
                      <th>price</th>
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