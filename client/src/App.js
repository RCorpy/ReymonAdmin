import React from 'react';
import Header from './components/Header'
import Menu from './components/Menu'
import OrdersDashboard from './components/dashboards/OrdersDashboard'
import ClientsDashboard from './components/dashboards/ClientDashBoard'
import ProductsDashboard from './components/dashboards/ProductDashboard'
import NewOrder from './components/dashboards/newOrder'
import Charts from './components/Charts'
import Footer from './components/Footer'
import {Route, Switch, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
      <div className="wrapper">
        <Header />
        <Menu />
        <Switch>
          <Route path="/Orders" render={()=>(<OrdersDashboard title="R-Orders" />)} />
          <Route path="/Clients" render={()=>(<ClientsDashboard title="R-Clients" />)} />
          <Route path="/Products" render={()=>(<ProductsDashboard title="R-Products" />)} />
          <Route path="/Charts" render={()=>(<Charts title="R-Dashboard" />)} />
          <Route path="/NewOrder" render={()=>(<NewOrder title="Create New Order" />)} />
          <Route path="/" render={()=>(<Charts title="R-Dashboard" />)} />
        </Switch>
        <Footer />
      </div>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
