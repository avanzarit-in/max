import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class AppMenu extends Component {
  state = {}

  handleItemClick = (e, data) => console.log(data);

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted>
        <Menu.Item
          name='editorials'
          active={activeItem === 'editorials'}
          onClick={this.handleItemClick}
        >
          Editorials
        </Menu.Item>

        <Menu.Item name='reviews' active={activeItem === 'reviews'} onClick={this.handleItemClick}>
          Reviews
        </Menu.Item>

        <Menu.Item
          name='upcomingEvents'
          active={activeItem === 'upcomingEvents'}
          onClick={this.handleItemClick}
        >
          Upcoming Events
        </Menu.Item>
      </Menu>
    )
  }
}
