import React from 'react';
import {Menu,Icon} from 'semantic-ui-react'

const LeftNav = (props) => {
    return (
        <Menu icon inverted vertical width='thin' style={{ position: 'fixed', height: '100%' }}>
            <Menu.Item as='a'>
                <Icon name='home' />
            </Menu.Item>
            <Menu.Item as='a'>
                <Icon name='gamepad' />
            </Menu.Item>
            <Menu.Item as='a'>
                <Icon name='camera' />
            </Menu.Item>
            <Menu.Item as='a' style={{ position: 'fixed', bottom: '80px'}}>
                <Icon name='arrow alternate circle right outline' />
            </Menu.Item>
            <Menu.Item as='a' style={{ position: 'fixed', bottom: '30px'}}>
                <Icon name='log out' />
            </Menu.Item>
        </Menu>
    );
}

export default LeftNav;