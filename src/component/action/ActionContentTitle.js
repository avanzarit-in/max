import React from 'react';
import { Menu, Icon, Header } from 'semantic-ui-react'
const ActionContentTitle = (props) => {
    return (
        <Menu borderless compact attached="top"  >
            <Menu.Item>
                <Header size="tiny" >{props.title}</Header>
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item as="a" name='close' >
                    <Icon name='arrow circle up' onClick={props.close} />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

export default ActionContentTitle;