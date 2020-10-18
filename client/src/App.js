import React from 'react';
import Header from './components/Header'
import Menu from './components/Menu'
import Content from './components/Content'
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
          <Route path="/RR" render={()=>(<Content title="RR-Dashboard" />)} />
          <Route path="/" render={()=>(<Content title="R-Dashboard" />)} />
        </Switch>
        <Footer />
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
