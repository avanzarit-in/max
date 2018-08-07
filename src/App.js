import React, { Component } from 'react';
import LeftNav from './component/LeftNav';
import Main from './component/containers/Main'
import Statement from './component/containers/Statement'
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
           <Route exact path="/" component={Main} />
           <Route exact path="/download" component={Statement} />
     </div>
      </BrowserRouter>
    )
  }
}

export default App;
