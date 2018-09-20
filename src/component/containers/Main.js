import React, { Component } from 'react';
import Detail from './../statement/Detail';
import Summary from './../statement/Summary';
import { Auth } from 'aws-amplify';
import { AuthPiece } from 'aws-amplify-react';
import { Route } from 'react-router';
import Landing from './Landing';
import { Menu, Sidebar, Segment, Dropdown, Icon, Popup, Breadcrumb } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const trigger = (userName) => (
    <span>
        <Icon name='user' /> Hello, {userName}
    </span>
)

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            icon: true,
            loading: true
        }
    }

    signOut = () => {
        Auth.signOut()
            .then(data => {
                // this.changeState('signedOut');
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    handleButtonClick = () => this.setState((prevState, props) => {
        return { visible: !this.state.visible, icon: true }
    });

    handleSidebarHide = () => this.setState({ visible: false })
    expand = () => {
        this.setState((prevState, props) => { return { icon: !prevState.icon } })
    }


    render() {

        const { visible, icon } = this.state
        const collapseIconName = icon ? 'arrow alternate circle right outline' : 'arrow alternate circle left outline'
        let locationPathNames = this.props.location.pathname.split("/")
        console.log(locationPathNames);

        let action = locationPathNames[1];

        return (
            <div style={{ height: '100%' }}>
                <Segment basic attached="top">
                    <Menu size="large" icon fixed="top" inverted style={{ height: '30px' }}   >
                        <Menu.Item icon onClick={this.handleButtonClick} style={{ width: '60px' }}>
                            <Icon name="sidebar" style={{ margin: 'auto' }} />
                        </Menu.Item>
                        <Menu.Item header >
                            {action !== undefined ?
                                <Breadcrumb>
                                    <Breadcrumb.Section  ><Link style={{ color: 'white' }} to={`/`}>Home</Link></Breadcrumb.Section>
                                    <Breadcrumb.Divider style={{ color: 'white' }} icon='right angle' />
                                    <Breadcrumb.Section active>{action === 'summary' ? 'Summary Report' : action === 'statement' ? 'Detailed Statement' : null}</Breadcrumb.Section>
                                </Breadcrumb>
                                : <Breadcrumb.Section  ><Link style={{ color: 'white' }} to={`/`}>Home</Link></Breadcrumb.Section>}
                        </Menu.Item>

                        <Menu.Menu position="right">
                            <Menu.Item>
                                <Dropdown trigger={trigger(this.props.username)} options={
                                    [
                                        {
                                            key: 'user',
                                            text: (
                                                <span>
                                                    Signed in as <strong>{this.props.username}</strong>
                                                </span>
                                            ),
                                            disabled: true,
                                        },
                                        { key: 'profile', text: 'Your Profile' },
                                        (<Dropdown.Item key='sign-out' onClick={this.signOut}>Sign Out</Dropdown.Item>),
                                    ]
                                } />
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Segment>

                <Sidebar.Pushable attached="bottom" basic style={{ marginTop: '-20px' }} as={Segment} >
                    <Sidebar
                        style={{ height: '100%', paddingTop: '40px' }}
                        as={Menu}
                        animation='push'
                        inverted
                        icon={icon}
                        onHide={this.handleSidebarHide}
                        vertical
                        visible={visible}

                        width={icon ? 'very thin' : null}>
                        <Menu.Item as='a'>
                            <Popup position="right center"
                                trigger={<Icon name='database' />}
                                content='Material Management'
                                size='mini'
                            />
                            {icon ? null : 'Material Management'}
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <Popup position="right center"
                                trigger={<Icon name='user' />}
                                content='User Management'
                                size='mini'
                            />
                            {icon ? null : 'User Management'}
                        </Menu.Item>
                        <div style={{ position: 'fixed', bottom: '10px', width: '100%' }}>
                            <Menu.Item as='a' onClick={this.expand}>
                                <Popup position="right center"
                                    trigger={<Icon name={collapseIconName} />}
                                    content={icon ? 'Expand' : 'Collapse'}
                                    size='mini'
                                />
                                {icon ? null : 'Collapse'}
                            </Menu.Item>
                            <Menu.Item as='a' onClick={this.signOut}>
                                <Popup position="right center"
                                    trigger={<Icon name='log out' />}
                                    content='Log Out'
                                    size='mini'
                                />
                                {icon ? null : 'Log Out'}
                            </Menu.Item>
                        </div>
                    </Sidebar>

                    <Sidebar.Pusher style={{ height: '100%' }}>
                        <Segment padded style={{ height: '100%', paddingTop: '50px',overflow:'scroll' }} attached="bottom" >

                            <Route exact path='/' render={(props) => <Landing {...this.props} />} />
                            <Route exact path={`/summary`} render={(props) => <Summary {...this.props} />} />
                            <Route exact path={`/statement`} render={(props) => <Detail {...this.props} />} />
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>

        );
    }
}