import React, { Component } from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar, Grid, Container } from 'semantic-ui-react'
import AppContent from './component/appcontent/AppContent'
import './App.css';

class App extends Component {

  render() { 
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar as={Menu} animation='push' icon inverted vertical visible width='very thin'>
          <Menu.Item as='a'>
            <Icon name='home' />
          </Menu.Item>

          <Menu.Item as='a'>
            <Icon name='gamepad' />
          </Menu.Item>

          <Menu.Item as='a'>
            <Icon name='camera' />
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher >
            <AppContent />
        </Sidebar.Pusher>
      </Sidebar.Pushable>

    )
  }
}

export default App;
