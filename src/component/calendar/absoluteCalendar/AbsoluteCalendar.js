import React from 'react';
import { Grid } from 'semantic-ui-react'
import AbsoluteCalendarWrapper from './AbsoluteCalendarWrapper'
import moment from 'moment'

const AbsoluteCalendar = (props) => {
console.log("Absolute calendar rendering");
    return (
        <Grid columns={2} divided >
            <Grid.Column>
                <AbsoluteCalendarWrapper handleError={props.handleFromDateError} type="from-date-calendar" date={props.fromDate} otherDate={props.toDate} callback={props.fromDateHandler} />
            </Grid.Column>
            <Grid.Column>
                <AbsoluteCalendarWrapper handleError={props.handleToDateError} type="to-date-calendar" date={props.toDate} otherDate={props.fromDate} callback={props.toDateHandler} />
            </Grid.Column>
        </Grid>
    );

}

export default AbsoluteCalendar;
