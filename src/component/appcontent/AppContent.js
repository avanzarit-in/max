import React, { Component } from 'react';
import {  Menu, Segment, Header,   Button, Icon } from 'semantic-ui-react';
import ActionContent from './../action/ActionContent';

export default class AppContent extends Component {
    state = {
        activeItem: ''
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleItemClosed = () => this.setState({ activeItem: '' })



    render() {
        const { activeItem } = this.state
        return (
            <Segment basic >
                <Menu borderless pointing attached="top"  >
                    <Menu.Item>
                        <Header as="h1">Dealer Dashboard</Header>
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item
                            name='download'
                            active={activeItem === 'download'}
                            onClick={this.handleItemClick}>
                            <Button primary={activeItem === 'download' ? true : false}> <Icon name='download' />
                                Download</Button>
                        </Menu.Item>
                        <Menu.Item
                            name='calendar'
                            active={activeItem === 'calendar'}
                            onClick={this.handleItemClick}>
                            <Button primary={activeItem === 'calendar' ? true : false}>
                                <Icon name='clock outline' />
                                2018/07/07 To 2018/07/07
                                </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                {(activeItem === "calendar") ? <ActionContent title="Select a Time Range to view the statement of account" close={this.handleItemClosed} name="calendar" /> :
                    (activeItem === "download") ? <ActionContent title="Download Statement of Account" close={this.handleItemClosed} name="download" /> :
                        null}

                <Segment attached="bottom" > Table Content
            </Segment>
            </Segment>

        );
    }
}
