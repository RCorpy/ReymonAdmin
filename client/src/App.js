import React from 'react';
import {BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store'
import ThisApp from './ThisApp'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
      <div className="wrapper">
        <ThisApp/>
      </div>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
