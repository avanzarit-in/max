import React from 'react';
import { Menu, Icon, Popup } from 'semantic-ui-react'

const LeftNav = (props) => {
    return (
        <Menu icon borderless inverted vertical width='thin' style={{ height: '100%' }}>
            <Menu.Item as='a'>
                <Popup size="mini"
                    trigger={<Icon name='home' />}
                    content='Home'
                    position='right center' />
            </Menu.Item>

            <Menu.Item as='a'>
                <Popup size="mini"
                    trigger={<Icon name='dashboard' />}
                    content='Dealer Dashboard'
                    position='right center' />
            </Menu.Item>

            <Menu.Item as='a' style={{ position: 'fixed', bottom: '80px' }}>
                <Icon name='arrow alternate circle right outline' />
            </Menu.Item>
            <Menu.Item as='a' style={{ position: 'fixed', bottom: '30px' }}>
                <Icon name='log out' />
            </Menu.Item>
        </Menu>
    );
}

export default LeftNav;