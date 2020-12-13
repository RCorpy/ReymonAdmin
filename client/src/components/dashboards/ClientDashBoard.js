import React, { useState, useEffect } from "react";
import Card from "../contentComponents/Card";
import { Table } from "react-bootstrap";
import {
  fetchModifyClient,
  fetchDeleteClient,
  
} from "../functions/fetchFunctions";
import Modal from "../Modal";
import { EXAMPLE_ORDER } from "./../../redux/exampleOrder";

import Toasts from '../Toast'


const URL = process.env.URL || "http://localhost:3000/";

export default function ClientDashboard({ title }) {
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState({acceptFunction:()=>console.log("works") , title: "My Modal", category: "confirm", body: "modal body"})
  const [showMyAsideDiv, setShowMyAsideDiv]=useState(false)
  const [toModifyValues, setToModifyValues] = useState({...EXAMPLE_ORDER.customer})
  const [tableValues, setTableValues] = useState([
    {
      ...EXAMPLE_ORDER.customer,
    },
  ]);

  const myAsideDivStyle = showMyAsideDiv ? {display: "inline"} :  {display: "none"}

  useEffect(() => {
    fetch(`${URL}clients`)
      .then((res) => res.json())
      .then((data) => setTableValues(data));
  }, []);

  const activateModal = (modalProps) =>{
    setShowModal(true)
    setModalProps(modalProps)
  }

  const modifyClient = (modifiedClient) => {
    fetchModifyClient(modifiedClient, activateModal);
  };

  const filterAfterDelete = (client) => {
    setTableValues((prev) => {
      return prev.filter((toFilterClient) => toFilterClient._id !== client._id);
    });
  };

  const deleteClient = (client) => {
    activateModal({acceptFunction:()=>{fetchDeleteClient(client); filterAfterDelete(client)}, title: "Deleting...", category: "confirm", body: `Are you sure you want to delete ${client.name}`})
  } 

  const createTableContent = () => {
    return tableValues.map((client) => {
      const normalTableClick = ()=>{
        setShowMyAsideDiv(!showMyAsideDiv)
        setToModifyValues(client)
    }
      return (
        <tr>
          <td onClick={normalTableClick}>{client.telephone}</td>
          <td onClick={normalTableClick}>{client.name}</td>
          <td onClick={normalTableClick}>{client.city}</td>
          <td onClick={normalTableClick}>{client.contact}</td>
          <td onClick={normalTableClick}>{client.country}</td>
          <td onClick={normalTableClick}>{client.CIF}</td>
          <td onClick={normalTableClick}>{client.email}</td>
          <td onClick={normalTableClick}>
            <div
              style={{ display: "flex", justifyContent: "center" }}
              onClick={normalTableClick}
            >
              <i class="far fa-edit"></i>
            </div>
          </td>
          <td>
            <div
              style={{ display: "flex", justifyContent: "center" }}
              onClick={() => deleteClient(client)}
            >
              <i class="fas fa-trash-alt"></i>
            </div>
          </td>
        </tr>
      );
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
              <Card title="Big card">
                <div class="position-relative mb-4">
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>telephone</th>
                        <th>name</th>
                        <th>City</th>
                        <th>Contact</th>
                        <th>Country</th>
                        <th>CIF</th>
                        <th>Email</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>{createTableContent()}</tbody>
                  </Table>
                </div>
              </Card>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
        <div className="wrapper myasidediv col-lg-6" style={myAsideDivStyle}>
        <div className="zindex1500">
          <h4>Modifying {toModifyValues._id}</h4>
          <form className="asideform" onSubmit={()=>console.log("handleSubmit")}>
          <div className="form-group dashboardformgroup">
            <label>Telephone</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,telephone:e.target.value})} value={toModifyValues.telephone}/>
          </div>
          <div className="form-group dashboardformgroup">
            <label>Name</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,name:e.target.value})} value={toModifyValues.name}/>
          </div>
          <div className="form-group dashboardformgroup">
            <label>Postal Code</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,postalCode:e.target.value})} value={toModifyValues.postalCode}/>
          </div>
          <div className="form-group dashboardformgroup">
            <label>Address</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues  ,address:e.target.value})} value={toModifyValues.address}/>
          </div>
          <div className="form-group dashboardformgroup">
            <label>City</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues,city:e.target.value})} value={toModifyValues.city}/>
          </div>
          <div className="form-group dashboardformgroup">
            <label>Province</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,province:e.target.value})} value={toModifyValues.province}/>
          </div>
          <div className="form-group dashboardformgroup">
            <label>Country</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues  ,country:e.target.value})} value={toModifyValues.country}/>
          </div>
          <div className="form-group dashboardformgroup">
            <label>Contact</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues,contact:e.target.value})} value={toModifyValues.contact}/>
          </div>
          <div className="form-group dashboardformgroup">
            <label>CIF</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,CIF:e.target.value})} value={toModifyValues.CIF}/>
          </div>
          <div className="form-group dashboardformgroup">
            <label>Email</label>
            <input type="text" onChange={(e)=>setToModifyValues({...toModifyValues ,email:e.target.value})} value={toModifyValues.email}/>
          </div>
          <div className="form-group dashboardformgroup">
            <button className="btn btn-primary" type="button" onClick={()=>{modifyClient(toModifyValues)}}>Save</button> {/*TOAST THIS*/}
            <button className="btn btn-secondary" type="button" onClick={()=>setShowMyAsideDiv(false)}>Close</button> {/*MODAL THIS*/}
          </div>
          </form>
        </div>
      </div>
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
