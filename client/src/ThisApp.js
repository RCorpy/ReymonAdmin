import React, {useEffect} from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import OrdersDashboard from "./components/dashboards/OrdersDashboard";
import ClientsDashboard from "./components/dashboards/ClientDashBoard";
import ProductsDashboard from "./components/dashboards/ProductDashboard";
import NewOrder from "./components/dashboards/newOrder";
import Charts from "./components/Charts";
import Footer from "./components/Footer";
import { Route, Switch } from "react-router-dom";
import {connect} from 'react-redux'

const URL = process.env.URL || 'http://localhost:3000/'

function ThisApp({setPrices}) {

    useEffect(()=>{
        
        fetch(`${URL}prices`)
        .then(res=>res.json())
        .then(data => setPrices(data))
            
          
    }, [])
  return (
    <>
      <Header />
      <Menu />
      <Switch>
        <Route
          path="/Orders"
          render={() => <OrdersDashboard title="R-Orders" />}
        />
        <Route
          path="/Clients"
          render={() => <ClientsDashboard title="R-Clients" />}
        />
        <Route
          path="/Products"
          render={() => <ProductsDashboard title="R-Products" />}
        />
        <Route path="/Charts" render={() => <Charts title="R-Dashboard" />} />
        <Route
          path="/NewOrder"
          render={() => <NewOrder title="Create New Order" />}
        />
        <Route path="/" render={() => <Charts title="R-Dashboard" />} />
      </Switch>
      <Footer />
    </>
  );
}

const connectedThisApp = connect(state => ({state:state}), (dispatch)=>({
    setPrices: (data) => {
      dispatch({
        type:'GET_PRICES',
        data: data
      })
  
    }
  }))(ThisApp)
  
  export default connectedThisApp;