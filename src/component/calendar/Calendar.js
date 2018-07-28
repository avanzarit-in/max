import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import QuickCalendar from './quickCalendar/QuickCalendar'
import AbsoluteCalendar from './absoluteCalendar/AbsoluteCalendar'
import RelativeCalendar from './relativeCalendar/RelativeCalendar'
import Footer from './Footer'
import moment from 'moment'

export default class Calendar extends Component {
    state = {
        activeItem: 'absolute',
        fromDate: new Date(),
        toDate: new Date()
    }

    //called from Absolute/quick/relative calendar component once a from date is selected
    setFromDate = (date) => {
        console.log("From Date :" + date);
        this.setState({ fromDate: date })
    }

    //called from Absolute/quick/relative calendar component once a from date is selected
    setToDate = (date) => {
        console.log("To Date :" + date);
        this.setState({ toDate: date })
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        return (
            <div>
                <Menu secondary pointing size="tiny" attached   >
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
                                <Segment attached ><AbsoluteCalendar fromDate={this.state.fromDate} setFromDateCallback={this.setFromDate} toDate={this.state.toDate} setToDateCallback={this.setToDate} /> </Segment> :
                                null
                }
                <Segment attached="bottom" basic>
                    <Footer fromDate={this.state.fromDate} toDate={this.state.toDate} />
                </Segment>
            </div>
        );
    }
}