import React from 'react';
import { Grid } from 'semantic-ui-react'
import AbsoluteCalendarBody from './AbsoluteCalendarBody'
import AbsoluteCalendarHeader from './AbsoluteCalendarHeader'

const AbsoluteCalendar = (props) => {

    let fromDateHeaderRef = React.createRef();
    let toDateHeaderRef = React.createRef();
    let fromDateBodyRef = React.createRef();
    let toDateBodyRef = React.createRef();
    
    //called from both calendarHeader/calendarBody when user types in the from date in the textfield
    let fromDateSelectedHandler = (date) => {
        //This is to make sure the date selected from the calendarBody is set back to the textfield
        fromDateHeaderRef.current.setDate(date);
        //This is to make sure date entered in the textField is propagated to the calender body 
        fromDateBodyRef.current.setDate(date);
        //this is to inform the Calendar container about the fromDate
        props.setFromDateCallback(date);
    }

    //called from both calendarHeader/calendarBody when user types in the to date in the textfield
    let toDateSelectedHandler = (date) => {
        //This is to make sure the date selected from the calendarBody is set back to the textfield
        toDateHeaderRef.current.setDate(date);
        //This is to make sure date entered in the textField is propagated to the calender body provided its a proper date
        toDateBodyRef.current.setDate(date);
        //this is to inform the calendar container about the toDate
        props.setToDateCallback(date);
    }


    console.log("AbsoluteCalendar component : render called");
    return (
        <Grid columns={2} divided >
            <Grid.Column>
                <Grid >
                    <Grid.Row>
                        <Grid.Column>
                            <AbsoluteCalendarHeader ref={fromDateHeaderRef} callback={fromDateSelectedHandler} title="From" />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <AbsoluteCalendarBody {...props} ref={fromDateBodyRef} callback={fromDateSelectedHandler} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
            <Grid.Column>
                <Grid >
                    <Grid.Row>
                        <Grid.Column>
                            <AbsoluteCalendarHeader ref={toDateHeaderRef} callback={toDateSelectedHandler} title="To" />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <AbsoluteCalendarBody {...props} ref={toDateBodyRef} callback={toDateSelectedHandler} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Grid.Column>
        </Grid>
    );

}

export default AbsoluteCalendar;