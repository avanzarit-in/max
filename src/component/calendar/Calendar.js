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
        fromDate: moment(),
        toDate: moment(),
        fromDateHasErrors: false,
        toDateHasErrors:false
    }

    handleFromDateError = () =>{
        this.setState({fromDateHasErrors:true});
    }

       handleToDateError = () =>{
        this.setState({toDateHasErrors:true});
    }

    fromDateHandler = (fromDate) => {
        console.log("From Date =>" + fromDate.format("YYYY/MM/DD"))
        if (fromDate.isAfter(this.state.toDate, 'date') || fromDate.isAfter(moment(), 'date')) {
           alert("Invalid Date Range!! From Date should be less than or Equal to To Date")
           this.setState({fromDateHasErrors:false});
        } else {
            this.setState({ fromDate: fromDate,fromDateHasErrors:false });
        }

    }

    toDateHandler = (toDate) => {
        console.log("To Date =>" + toDate.format("YYYY/MM/DD"))
        if (toDate.isBefore(this.state.fromDate, 'date') || toDate.isAfter(moment(), 'date')) {
              alert("Invalid Date Range!! From Date should be less than or Equal to To Date")
              this.setState({toDateHasErrors:false});
        } else {
            this.setState({ toDate: toDate,toDateHasErrors:false });
        }

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
                {/**    <Menu.Item as="a" name='relative' active={this.state.activeItem === 'relative'}
                        onClick={this.handleItemClick}>
                        Relative
            </Menu.Item> **/}
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
                                <Segment attached ><AbsoluteCalendar handleFromDateError={this.handleFromDateError} handleToDateError={this.handleToDateError} fromDate={this.state.fromDate} toDate={this.state.toDate} fromDateHandler={this.fromDateHandler} toDateHandler={this.toDateHandler} /> </Segment> :
                                null
                }
                <Segment attached="bottom">
                    <Footer {...this.state} hasErrors={this.state.fromDateHasErrors||this.state.toDateHasErrors} />
                </Segment>
            </div>
        );
    }
}