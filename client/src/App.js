import React from 'react';
import Header from './components/Header'
import Menu from './components/Menu'
import Content from './components/Content'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <div class="wrapper">
        <Header />
        <Menu />
        <Content title="R-Dashboard"/>
        <Footer />
      </div>
    </div>
  );
}

export default App;
