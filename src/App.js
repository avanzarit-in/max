import React, { Component } from 'react';
import LeftNav from './component/LeftNav';
import AppContent from './component/appcontent/AppContent'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div>
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
