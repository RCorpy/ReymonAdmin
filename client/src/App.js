import React from 'react';
import Header from './components/Header'
import Menu from './components/Menu'
import Dashboard from './components/Dashboard'
import Charts from './components/Charts'
import Footer from './components/Footer'
import {Route, Switch, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div class="wrapper">
        <Header />
        <Menu />
        <Switch>
          <Route path="/RR" render={()=>(<Dashboard title="R-Dashboard" />)} />
          <Route path="/Charts" render={()=>(<Charts title="R-Dashboard" />)} />
          <Route path="/" render={()=>(<Charts title="R-Dashboard" />)} />
        </Switch>
        <Footer />
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
