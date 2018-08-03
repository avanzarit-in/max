import React from 'react';
import { Grid } from 'semantic-ui-react'
import AbsoluteCalendarBody from './AbsoluteCalendarBody'
import AbsoluteCalendarHeader from './AbsoluteCalendarHeader'

const AbsoluteCalendar = (props) => {

    console.log("AbsoluteCalendar component : render called");
    return (
        <Grid columns={2} divided >
            <Grid.Column>
                <Grid >
                    <Grid.Row>
                        <Grid.Column>
                            <AbsoluteCalendarHeader errorFlag={props.fromDateErrorFlag}  date={props.fromDate} callback={props.setFromDateCallback} title="From" />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <AbsoluteCalendarBody type="from-date-calendar" errorFlag={props.errorFlag} date={props.fromDate} otherDate={props.toDate}  callback={props.setFromDateCallback} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
            <Grid.Column>
                <Grid >
                    <Grid.Row>
                        <Grid.Column>
                            <AbsoluteCalendarHeader errorFlag={props.toDateErrorFlag}  date={props.toDate} callback={props.setToDateCallback} title="To" />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <AbsoluteCalendarBody type="to-date-calendar" errorFlag={props.errorFlag} date={props.toDate} otherDate={props.fromDate}  callback={props.setToDateCallback}  />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Grid.Column>
        </Grid>
    );

}

export default AbsoluteCalendar;