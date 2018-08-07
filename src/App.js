import React, { Component } from 'react';
import LeftNav from './component/LeftNav';
import AppContent from './component/appcontent/AppContent'
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <div style={{ position: 'fixed', top: '0', left: '0', height: '100%',width:'50px' }}>
          <LeftNav/>
        </div>
        <div style={{ marginLeft: '50px' }}>
        <Route path="/" component={AppContent} />

        </div>
      </div>
      </BrowserRouter>
    )
  }
}

export default App;
