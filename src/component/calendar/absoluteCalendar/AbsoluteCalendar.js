import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import AbsoluteCalendarBody from './AbsoluteCalendarBody'
import AbsoluteCalendarHeader from './AbsoluteCalendarHeader'

export default class AbsoluteCalendar extends Component {
    constructor(props) {
        super(props);
        this.fromDateHeaderRef = React.createRef();
        this.toDateHeaderRef = React.createRef();
    }

    //Once the component is rendered we dont need to rerender it as it may result in rerendering child components for no reason
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    //called from both calendarHeader/calendarBody when user types in the from date in the textfield
    fromDateSelectedHandler = (date) => {
        //This is to make sure the date selected from the calendarBody is set back to the textfield
        this.fromDateHeaderRef.current.setDate(date);
        //this is to inform the Calendar container about the fromDate
        this.props.fromDateChangeCallback(date);
    }

//called from both calendarHeader/calendarBody when user types in the to date in the textfield
    toDateSelectedHandler = (date) => {
          //This is to make sure the date selected from the calendarBody is set back to the textfield
        this.toDateHeaderRef.current.setDate(date);
        //this is to inform the calendar container about the toDate
        this.props.toDateChangeCallback(date);
    }

    render() {
        console.log("AbsoluteCalendar component : render called");
        return (
            <Grid columns={2} divided >
                <Grid.Column>
                    <Grid >
                        <Grid.Row>
                            <Grid.Column>
                                <AbsoluteCalendarHeader ref={this.fromDateHeaderRef} dateSelectedCallback={this.fromDateSelectedHandler} title="From" />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <AbsoluteCalendarBody dateSelectedCallback={this.fromDateSelectedHandler} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
                <Grid.Column>
                    <Grid >
                        <Grid.Row>
                            <Grid.Column>
                                <AbsoluteCalendarHeader ref={this.toDateHeaderRef} dateSelectedCallback={this.toDateSelectedHandler} title="To" />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <AbsoluteCalendarBody dateSelectedCallback={this.toDateSelectedHandler} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </Grid.Column>
            </Grid>
        );
    }
}
