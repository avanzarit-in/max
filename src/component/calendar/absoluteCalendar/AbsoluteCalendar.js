import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import AbsoluteCalendarBody from './AbsoluteCalendarBody'
import AbsoluteCalendarHeader from './AbsoluteCalendarHeader'
import PropTypes from 'prop-types'

export default class AbsoluteCalendar extends Component {
    constructor(props) {
        super(props);
        this.fromDateHeaderRef = React.createRef();
        this.toDateHeaderRef = React.createRef();
        this.fromDateBodyRef = React.createRef();
        this.toDateBodyRef = React.createRef();
    }
   
    //called from both calendarHeader/calendarBody when user types in the from date in the textfield
    fromDateSelectedHandler = (date) => {
        //This is to make sure the date selected from the calendarBody is set back to the textfield
        this.fromDateHeaderRef.current.setDate(date);
        //This is to make sure date entered in the textField is propagated to the calender body 
        this.fromDateBodyRef.current.setDate(date);
        //this is to inform the Calendar container about the fromDate
        this.props.callback(date);
    }

    //called from both calendarHeader/calendarBody when user types in the to date in the textfield
    toDateSelectedHandler = (date) => {
        //This is to make sure the date selected from the calendarBody is set back to the textfield
        this.toDateHeaderRef.current.setDate(date);
        //This is to make sure date entered in the textField is propagated to the calender body provided its a proper date
        this.toDateBodyRef.current.setDate(date);
        //this is to inform the calendar container about the toDate
        this.props.callback(date);
    }

    render() {
        console.log("AbsoluteCalendar component : render called");
        return (
            <Grid columns={2} divided >
                <Grid.Column>
                    <Grid >
                        <Grid.Row>
                            <Grid.Column>
                                <AbsoluteCalendarHeader ref={this.fromDateHeaderRef} callback={this.fromDateSelectedHandler} title="From" />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <AbsoluteCalendarBody {...this.props} ref={this.fromDateBodyRef} callback={this.fromDateSelectedHandler} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
                <Grid.Column>
                    <Grid >
                        <Grid.Row>
                            <Grid.Column>
                                <AbsoluteCalendarHeader ref={this.toDateHeaderRef} callback={this.toDateSelectedHandler} title="To" />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <AbsoluteCalendarBody {...this.props} ref={this.toDateBodyRef} callback={this.toDateSelectedHandler} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </Grid.Column>
            </Grid>
        );
    }
}
