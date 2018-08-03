import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import QuickCalendar from './quickCalendar/QuickCalendar'
import AbsoluteCalendar from './absoluteCalendar/AbsoluteCalendar'
import RelativeCalendar from './relativeCalendar/RelativeCalendar'
import Footer from './Footer'


export default class Calendar extends Component {
    state = {
        activeItem: 'absolute'
    }

  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        return (
            <div>
                <Menu pointing size="tiny" attached   >
                    <Menu.Item as="a" name='quick' active={this.state.activeItem === 'quick'}
                        onClick={this.handleItemClick} >
                        Quick
            </Menu.Item>
                    <Menu.Item as="a" name='relative' active={this.state.activeItem === 'relative'}
                        onClick={this.handleItemClick}>
                        Relative
            </Menu.Item>
                    <Menu.Item as="a" name='absolute' active={this.state.activeItem === 'absolute'}
                        onClick={this.handleItemClick}>
                        Absolute
            </Menu.Item>
                </Menu>
                {
                    (this.state.activeItem === 'quick') ?
                        <Segment attached > <QuickCalendar /> </Segment> :
                        (this.state.activeItem === 'relative') ?
                            <Segment attached ><RelativeCalendar /> </Segment> :
                            (this.state.activeItem === 'absolute') ?
                                <Segment attached ><AbsoluteCalendar {...this.props}  /> </Segment> :
                                null
                }
                <Segment attached="bottom">
                    <Footer {...this.props} />
                </Segment>
            </div>
        );
    }
}