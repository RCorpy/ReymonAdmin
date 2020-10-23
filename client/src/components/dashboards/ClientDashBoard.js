import React, {useState, useEffect} from "react";
import Card from "../contentComponents/Card"
import {Table} from "react-bootstrap"
import {fetchModifyClient, fetchDeleteClient} from '../functions/fetchFunctions'

const URL = process.env.URL || 'http://localhost:3000/'

export default function ClientDashboard({title}) {

  const [tableValues, setTableValues] = useState([
    {
      _id: "qqewqyuweoq",       
      name: "Demo Customer",
      discount: 50
    }
  ]) 

  useEffect(()=>{
    fetch(`${URL}clients`)
    .then(res=>res.json())
    .then(data=>setTableValues(data))
  },[])

  const modifyClient = (client, modifiedClient) => {
    fetchModifyClient(client, modifiedClient)
    setTableValues((prev)=>{
      return prev.map((mappedClient)=>{
        if(mappedClient._id === client._id){
          return modifiedClient
        }
        else {return mappedClient}
      })
    })
  } 

  const deleteClient = (client) => {
    fetchDeleteClient(client)
    setTableValues((prev)=>{
      return prev.filter(toFilterClient => toFilterClient._id !== client._id)
    })
  } 

  const createTableContent = () =>{
    return tableValues.map(client=>{
      return (
      <tr>
        <td>{client.name}</td>
        <td>{client.discount}</td>
        <td><div style={{display:"flex", justifyContent:"center"}} onClick={()=>modifyClient(client, {...client, discount: 20})}><i class="far fa-edit"></i></div></td>
        <td><div style={{display:"flex", justifyContent:"center"}} onClick={()=>deleteClient(client)}><i class="fas fa-trash-alt"></i></div></td>
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
                      <th>discount</th>
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