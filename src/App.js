import React, { Component } from 'react';
import LeftNav from './component/LeftNav';
import AppContent from './component/appcontent/AppContent'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div style={{ position: 'fixed', top: '0', left: '0', height: '100%',width:'50px' }}>
          <LeftNav/>
        </div>
        <div style={{ marginLeft: '50px' }}>
          <AppContent />
        </div>
      </div>
    )
  }
}

export default App;
